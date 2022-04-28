## teleport
将组件挂载到指定的元素上, 无需拆分页面结构

场景： 模态框  
```html
 <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
```
## vue3 中 v-if的优先级高于 v-for
