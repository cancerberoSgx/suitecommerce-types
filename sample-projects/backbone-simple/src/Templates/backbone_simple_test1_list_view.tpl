<div>
  <ul>
    {{#each collection}}
    <li>{{this.value}}</li>
    {{/each}}
  </ul>
  <input placeholder="something to add" class="toAdd">
  <button class="add">add</button>
</div>