class Tree extends HTMLElement {
   static get observedAttributes() {
      return ['tree'];
   }
   get Tree() {
      return this._tree;
   }
   set Tree(val) {
      this._tree = val;
      this.render();
   }

   constructor(id) {
      super();
      this._tree = { id: 'root', items: [] };

      this.attachShadow({ mode: "open" });
      if (id) this.setAttribute("id", id);
   }

   attributeChangedCallback(name, oldValue, newValue) {
      this.Tree = JSON.parse(newValue);
   }
   render() {
      let shadow = this.shadowRoot;
      let nodeItem = new Node(true);
      nodeItem.Tree = this._tree;
      shadow.appendChild(nodeItem);
   }
}

class Node extends Tree {
   get ID() {
      return this._tree ? this._tree.id : null;
   }
   get items() {
      return this._tree ? this._tree.items : null;
   }
   render() {
      let shadow = this.shadowRoot;
      let ul = document.createElement('ul');
      shadow.appendChild(ul);

      let li = document.createElement('li');
      li.innerHTML = '' + this.ID;
      ul.appendChild(li);

      if (this.items) {
         this.items.forEach(item => {
            let newNode = new Node(true);
            newNode.Tree = item;
            li.appendChild(newNode);
         })
      }
   }
}

window.customElements.define("my-tree", Tree);
window.customElements.define("my-node", Node);