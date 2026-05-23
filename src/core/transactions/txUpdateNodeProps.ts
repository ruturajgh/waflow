import type { EditorState } from "../editor";
import type { Transaction } from "../transactionManager";

type Patch = {
  prop: string;
  oldValue: any;
  newValue: any;
};

export class TxUpdateNodeProps implements Transaction {
  private nodeId: string;
  private patch: Patch;

  constructor(nodeId: string, patch: Patch) {
    this.nodeId = nodeId;
    this.patch = patch;
  }

  apply(state: EditorState): EditorState {
    const node = state.nodes.get(this.nodeId);

    if (!node) return state;

    const newProps = applyPatch(node.props, {
      prop: this.patch.prop,
      value: this.patch.newValue,
    });

    return {
      ...state,
      nodes: new Map(state.nodes).set(this.nodeId, {
        ...node,
        props: newProps,
      }),
    };
  }

  invert(): Transaction {
    return new TxUpdateNodeProps(this.nodeId, {
      prop: this.patch.prop,
      oldValue: this.patch.newValue,
      newValue: this.patch.oldValue,
    });
  }
}

function applyPatch(props, patch) {
  const path = Array.isArray(patch.prop) ? patch.prop : patch.prop.split(".");

  function update(obj, i) {
    const key = path[i];

    // leaf update
    if (i === path.length - 1) {
      if (obj?.[key] === patch.value) {
        return obj;
      }

      return {
        ...obj,
        [key]: patch.value,
      };
    }

    const currentChild = obj?.[key];
    const nextChild = update(currentChild ?? {}, i + 1);

    // structural sharing
    if (nextChild === currentChild) {
      return obj;
    }

    return {
      ...obj,
      [key]: nextChild,
    };
  }

  return update(props, 0);
}
