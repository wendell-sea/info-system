import Vue from 'vue';

import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    row,
    col,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Icon,
    Card,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Tag,
    Tooltip,
    Dialog,
    Select,
    Option,
    MessageBox,
    Pagination,
    Upload,
    DatePicker,
    TimePicker,
    TimeSelect,

} from 'element-ui';


Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(row)
Vue.use(col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Icon)
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(TimeSelect)