import '../__common__/styles.less'
import StickyList from 'sticky-list'

const numberOfLists = 2
const baseListId = 'sticky-list'

function initStickyList (index) {
  let list = document.getElementById(baseListId + index)
  let listItems = list.getElementsByClassName('sticky-list-item')

  // Initializing StickyList.
  let stickyListSource = StickyList(list)

  // Binding items to list.
  for (let e = 0; e < listItems.length; e++) {
    stickyListSource.bindItem(listItems[e])
  }
}

for (let i = 1; i <= numberOfLists; i++) {
  initStickyList(i)
}
