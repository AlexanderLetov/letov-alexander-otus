import ITree from '../interfaces/ITree'
import ITreeItem from '../interfaces/ITreeItem'

export class Tree extends HTMLElement implements ITreeItem {
   _tree: ITree = { id: 'root', items: [] };

   static get observedAttributes(): Array<string> {
      return ['tree'];
   }
   get Tree(): ITree {
      return this._tree;
   }
   set Tree(val: ITree) {
      this._tree = val;
      this.render();
   }

   constructor(id: string) {
      super();
      this._tree = { id: 'root', items: [] };

      this.attachShadow({ mode: "open" });
      if (id) this.setAttribute("id", id);
   }

   attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      this.Tree = JSON.parse(newValue);
   }
   render() {
      let shadow = this.shadowRoot;
      let nodeItem = new Node("");
      nodeItem.Tree = this._tree;
      if (shadow) shadow.appendChild(nodeItem);
   }
}

export class Node extends Tree {
   get ID(): string | null {
      return this._tree ? this._tree.id : null;
   }
   get items() {
      return this._tree ? this._tree.items : null;
   }
   render() {
      let shadow = this.shadowRoot;
      let ul = document.createElement('ul');
      if (shadow) shadow.appendChild(ul);

      let li = document.createElement('li');
      li.innerHTML = '' + this.ID;
      ul.appendChild(li);

      if (this.items) {
         this.items.forEach(item => {
            let newNode = new Node("");
            newNode.Tree = item;
            li.appendChild(newNode);
         })
      }
   }
}