import '../__common__/styles.less'
import StickyList from 'sticky-list'

const listTarget = document.getElementById('sticky-list')
const listItems = listTarget.getElementsByClassName('sticky-list-item')
const stickyListSource = StickyList(listTarget)


for (let e = 0; e < listItems.length; e++) {
  stickyListSource.bindItem(listItems[e])
}
