import type { EditorState } from "./editor";

/**
 * --------------------------------
 * Transaction Interface
 * --------------------------------
 */
export interface Transaction {
  /**
   * Apply changes to editor state
   */
  apply(state: EditorState): EditorState;

  /**
   * Produce inverse transaction
   */
  invert(state: EditorState): Transaction;

  /**
   * Optional:
   * don't add to undo history
   */
  addToHistory?: boolean;
}

/**
 * --------------------------------
 * History Event
 * --------------------------------
 */
type HistoryEvent = {
  transactions: Transaction[];
  timestamp: number;
};

/**
 * --------------------------------
 * Transaction Manager
 * --------------------------------
 */
export class TransactionManager {
  state: EditorState;
  private listeners: Set<T>
  /**
   * Undo / redo stacks
   */
  private undoStack: HistoryEvent[] = [];
  private redoStack: HistoryEvent[] = [];

  /**
   * Current batch
   */
  private currentBatch: Transaction[] = [];

  /**
   * Grouping delay
   */
  private newGroupDelay = 500;

  private lastTransactionTime = 0;

  constructor(initial: EditorState) {
    this.state = initial;
    this.listeners = new Set()
  }

  /**
   * --------------------------------
   * State Access
   * --------------------------------
   */
  getState() {
    return this.state;
  }

  /**
   * --------------------------------
   * Dispatch Transaction
   * --------------------------------
   */
  dispatch(tx: Transaction) {
    const now = Date.now();

    const shouldAddToHistory = tx.addToHistory !== false;

    /**
     * Auto-commit previous batch
     * if enough time has passed
     */
    if (now - this.lastTransactionTime > this.newGroupDelay) {
      this.commit();
    }

    /**
     * Build inverse BEFORE apply
     */
    let inverse: Transaction | null = null;

    /**
     * Apply transaction
     */
    this.state = tx.apply(this.state);

    if (shouldAddToHistory) {
      inverse = tx.invert(this.state);
    }
    /**
     * Store inverse in current batch
     */
    if (inverse) {
      this.currentBatch.push(inverse);

      /**
       * Any new edit clears redo
       */
      this.redoStack = [];
    }

    this.lastTransactionTime = now;
    this.emit()
  }

  /**
   * --------------------------------
   * Begin Manual Batch
   * --------------------------------
   */
  beginBatch() {
    this.commit();
  }

  /**
   * --------------------------------
   * Commit Current Batch
   * --------------------------------
   */
  commit() {
    if (!this.currentBatch.length) return;

    /**
     * Reverse so undo order is correct
     */
    this.undoStack.push({
      transactions: [...this.currentBatch].reverse(),
      timestamp: Date.now(),
    });

    this.currentBatch = [];
    this.emit()
  }

  /**
   * --------------------------------
   * Undo
   * --------------------------------
   */
  undo() {
    /**
     * Flush pending edits first
     */
    this.commit();

    const event = this.undoStack.pop();

    if (!event) return;

    const redoTransactions: Transaction[] = [];

    /**
     * Apply inverse transactions
     */
    for (const tx of event.transactions) {
      this.state = tx.apply(this.state);
      /**
       * Build redo transaction
       * BEFORE applying undo
       */
      const redoTx = tx.invert(this.state);

      redoTransactions.push(redoTx);
    }

    /**
     * Store redo event
     */
    this.redoStack.push({
      transactions: redoTransactions.reverse(),
      timestamp: Date.now(),
    });
    this.emit()
  }

  /**
   * --------------------------------
   * Redo
   * --------------------------------
   */
  redo() {
    const event = this.redoStack.pop();

    if (!event) return;

    const undoTransactions: Transaction[] = [];

    for (const tx of event.transactions) {
      this.state = tx.apply(this.state);
      /**
       * Build inverse for future undo
       */
      const undoTx = tx.invert(this.state);

      undoTransactions.push(undoTx);
    }

    this.undoStack.push({
      transactions: undoTransactions.reverse(),
      timestamp: Date.now(),
    });
    this.emit()
  }

  /**
   * --------------------------------
   * Clear History
   * --------------------------------
   */
  clearHistory() {
    this.undoStack = [];
    this.redoStack = [];
    this.currentBatch = [];
  }

  subscribe(listener: Function) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}
