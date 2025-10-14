import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

// 导入页面组件
import Dashboard from '../views/Dashboard.vue'
import MenuManagement from '../views/MenuManagement.vue'
import FileUpload from '../views/FileUpload.vue'
import NotFound from '../views/NotFound.vue'
import ButtonDemo from '../views/elementPlus/ButtonDemo.vue'
import InputDemo from '../views/elementPlus/InputDemo.vue'
import SelectDemo from '../views/elementPlus/SelectDemo.vue'
import DatePickerDemo from '../views/elementPlus/DatePickerDemo.vue'
import DialogDemo from '../views/elementPlus/DialogDemo.vue'
import TableDemo from '../views/elementPlus/TableDemo.vue'
import FormDemo from '../views/elementPlus/FormDemo.vue'
import UploadDemo from '../views/elementPlus/UploadDemo.vue'
import ButtonGroupDemo from '../views/elementPlus/ButtonGroupDemo.vue'
import LayoutDemo from '../views/elementPlus/LayoutDemo.vue'
import ContainerDemo from '../views/elementPlus/ContainerDemo.vue'
import ProgressDemo from '../views/elementPlus/ProgressDemo.vue'
import NotificationDemo from '../views/elementPlus/NotificationDemo.vue'
import AlertDemo from '../views/elementPlus/AlertDemo.vue'
import LoadingDemo from '../views/elementPlus/LoadingDemo.vue'
import MessageDemo from '../views/elementPlus/MessageDemo.vue'
import MessageBoxDemo from '../views/elementPlus/MessageBoxDemo.vue'
import LinkDemo from '../views/elementPlus/LinkDemo.vue'
import TextDemo from '../views/elementPlus/TextDemo.vue'
import SpaceDemo from '../views/elementPlus/SpaceDemo.vue'
import ScrollbarDemo from '../views/elementPlus/ScrollbarDemo.vue'
import InputNumberDemo from '../views/elementPlus/InputNumberDemo.vue'
import RadioDemo from '../views/elementPlus/RadioDemo.vue'
import CheckboxDemo from '../views/elementPlus/CheckboxDemo.vue'
import SwitchDemo from '../views/elementPlus/SwitchDemo.vue'
import SliderDemo from '../views/elementPlus/SliderDemo.vue'
import RateDemo from '../views/elementPlus/RateDemo.vue'
import TimePickerDemo from '../views/elementPlus/TimePickerDemo.vue'
import TimeSelectDemo from '../views/elementPlus/TimeSelectDemo.vue'
import PaginationDemo from '../views/elementPlus/PaginationDemo.vue'
import TagDemo from '../views/elementPlus/TagDemo.vue'
import CalendarDemo from '../views/elementPlus/CalendarDemo.vue'
import ImageDemo from '../views/elementPlus/ImageDemo.vue'
import AvatarDemo from '../views/elementPlus/AvatarDemo.vue'
import BadgeDemo from '../views/elementPlus/BadgeDemo.vue'
import TabsDemo from '../views/elementPlus/TabsDemo.vue'
import CollapseDemo from '../views/elementPlus/CollapseDemo.vue'
import TimelineDemo from '../views/elementPlus/TimelineDemo.vue'
import EmptyDemo from '../views/elementPlus/EmptyDemo.vue'
import ResultDemo from '../views/elementPlus/ResultDemo.vue'
import SkeletonDemo from '../views/elementPlus/SkeletonDemo.vue'
import BreadcrumbDemo from '../views/elementPlus/BreadcrumbDemo.vue'
import StepsDemo from '../views/elementPlus/StepsDemo.vue'
import AffixDemo from '../views/elementPlus/AffixDemo.vue'
import BacktopDemo from '../views/elementPlus/BacktopDemo.vue'
import DividerDemo from '../views/elementPlus/DividerDemo.vue'
import ConfigProviderDemo from '../views/elementPlus/ConfigProviderDemo.vue'
import TransferDemo from '../views/elementPlus/TransferDemo.vue'
import TreeSelectDemo from '../views/elementPlus/TreeSelectDemo.vue'
import CascaderDemo from '../views/elementPlus/CascaderDemo.vue'
import AutocompleteDemo from '../views/elementPlus/AutocompleteDemo.vue'
import CarouselDemo from '../views/elementPlus/CarouselDemo.vue'
import PopoverDemo from '../views/elementPlus/PopoverDemo.vue'
import TooltipDemo from '../views/elementPlus/TooltipDemo.vue'
import AnchorDemo from '../views/elementPlus/AnchorDemo.vue'
import DropdownDemo from '../views/elementPlus/DropdownDemo.vue'
import PageHeaderDemo from '../views/elementPlus/PageHeaderDemo.vue'
import DrawerDemo from '../views/elementPlus/DrawerDemo.vue'
import PopconfirmDemo from '../views/elementPlus/PopconfirmDemo.vue'
import TreeDemo from '../views/elementPlus/TreeDemo.vue'
import MessageCenter from '../views/MessageCenter.vue'
import PersonalDocs from '../views/PersonalDocs.vue'
import PersonalDocsCategory from '../views/PersonalDocsCategory.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: '仪表板',
      icon: 'DataAnalysis'
    }
  },
  {
    path: '/menu/management',
    name: 'MenuManagement',
    component: MenuManagement,
    meta: {
      title: '新增菜单',
      icon: 'Plus'
    }
  },
  {
    path: '/content/upload',
    name: 'FileUpload',
    component: FileUpload,
    meta: {
      title: '文件上传',
      icon: 'Upload'
    }
  },
  // Element Plus 组件讲解
  { path: '/ep/button', name: 'EpButton', component: ButtonDemo, meta: { title: 'EP-按钮', icon: 'Pointer' } },
  { path: '/ep/button-group', name: 'EpButtonGroup', component: ButtonGroupDemo, meta: { title: 'EP-按钮组', icon: 'MoreFilled' } },
  { path: '/ep/input', name: 'EpInput', component: InputDemo, meta: { title: 'EP-输入框', icon: 'Edit' } },
  { path: '/ep/select', name: 'EpSelect', component: SelectDemo, meta: { title: 'EP-选择器', icon: 'ArrowDown' } },
  { path: '/ep/date', name: 'EpDate', component: DatePickerDemo, meta: { title: 'EP-日期', icon: 'Calendar' } },
  { path: '/ep/dialog', name: 'EpDialog', component: DialogDemo, meta: { title: 'EP-对话框', icon: 'ChatLineSquare' } },
  { path: '/ep/table', name: 'EpTable', component: TableDemo, meta: { title: 'EP-表格', icon: 'Grid' } },
  { path: '/ep/form', name: 'EpForm', component: FormDemo, meta: { title: 'EP-表单', icon: 'List' } },
  { path: '/ep/upload', name: 'EpUpload', component: UploadDemo, meta: { title: 'EP-上传', icon: 'Upload' } },
  // 布局组件
  { path: '/ep/layout', name: 'EpLayout', component: LayoutDemo, meta: { title: 'EP-布局', icon: 'Grid' } },
  { path: '/ep/container', name: 'EpContainer', component: ContainerDemo, meta: { title: 'EP-容器', icon: 'Box' } },
  { path: '/ep/progress', name: 'EpProgress', component: ProgressDemo, meta: { title: 'EP-进度条', icon: 'Loading' } },
  // 反馈组件
  { path: '/ep/notification', name: 'EpNotification', component: NotificationDemo, meta: { title: 'EP-通知', icon: 'Bell' } },
  { path: '/ep/alert', name: 'EpAlert', component: AlertDemo, meta: { title: 'EP-警告', icon: 'Warning' } },
  { path: '/ep/loading', name: 'EpLoading', component: LoadingDemo, meta: { title: 'EP-加载', icon: 'Loading' } },
  { path: '/ep/message', name: 'EpMessage', component: MessageDemo, meta: { title: 'EP-消息', icon: 'ChatDotRound' } },
  { path: '/ep/messagebox', name: 'EpMessageBox', component: MessageBoxDemo, meta: { title: 'EP-消息框', icon: 'ChatLineSquare' } },
  // 其他组件
  { path: '/ep/link', name: 'EpLink', component: LinkDemo, meta: { title: 'EP-链接', icon: 'Link' } },
  { path: '/ep/text', name: 'EpText', component: TextDemo, meta: { title: 'EP-文本', icon: 'Document' } },
  { path: '/ep/space', name: 'EpSpace', component: SpaceDemo, meta: { title: 'EP-间距', icon: 'Grid' } },
  { path: '/ep/scrollbar', name: 'EpScrollbar', component: ScrollbarDemo, meta: { title: 'EP-滚动条', icon: 'Sort' } },
  // 新增表单组件
  { path: '/ep/input-number', name: 'EpInputNumber', component: InputNumberDemo, meta: { title: 'EP-数字输入框', icon: 'Calculator' } },
  { path: '/ep/radio', name: 'EpRadio', component: RadioDemo, meta: { title: 'EP-单选框', icon: 'CircleCheck' } },
  { path: '/ep/checkbox', name: 'EpCheckbox', component: CheckboxDemo, meta: { title: 'EP-多选框', icon: 'Select' } },
  { path: '/ep/switch', name: 'EpSwitch', component: SwitchDemo, meta: { title: 'EP-开关', icon: 'Switch' } },
  { path: '/ep/slider', name: 'EpSlider', component: SliderDemo, meta: { title: 'EP-滑块', icon: 'Rank' } },
  { path: '/ep/rate', name: 'EpRate', component: RateDemo, meta: { title: 'EP-评分', icon: 'Star' } },
  { path: '/ep/time-picker', name: 'EpTimePicker', component: TimePickerDemo, meta: { title: 'EP-时间选择器', icon: 'Clock' } },
  { path: '/ep/time-select', name: 'EpTimeSelect', component: TimeSelectDemo, meta: { title: 'EP-时间选择', icon: 'Timer' } },
  // 新增数据展示组件
  { path: '/ep/pagination', name: 'EpPagination', component: PaginationDemo, meta: { title: 'EP-分页', icon: 'DocumentCopy' } },
  { path: '/ep/tag', name: 'EpTag', component: TagDemo, meta: { title: 'EP-标签', icon: 'PriceTag' } },
  { path: '/ep/calendar', name: 'EpCalendar', component: CalendarDemo, meta: { title: 'EP-日历', icon: 'Calendar' } },
  { path: '/ep/image', name: 'EpImage', component: ImageDemo, meta: { title: 'EP-图片', icon: 'Picture' } },
  { path: '/ep/avatar', name: 'EpAvatar', component: AvatarDemo, meta: { title: 'EP-头像', icon: 'User' } },
  { path: '/ep/badge', name: 'EpBadge', component: BadgeDemo, meta: { title: 'EP-徽章', icon: 'Bell' } },
  // 新增导航组件
  { path: '/ep/tabs', name: 'EpTabs', component: TabsDemo, meta: { title: 'EP-标签页', icon: 'Document' } },
  // 新增数据展示组件
  { path: '/ep/collapse', name: 'EpCollapse', component: CollapseDemo, meta: { title: 'EP-折叠面板', icon: 'Fold' } },
  { path: '/ep/timeline', name: 'EpTimeline', component: TimelineDemo, meta: { title: 'EP-时间线', icon: 'Clock' } },
  { path: '/ep/empty', name: 'EpEmpty', component: EmptyDemo, meta: { title: 'EP-空状态', icon: 'Box' } },
  { path: '/ep/result', name: 'EpResult', component: ResultDemo, meta: { title: 'EP-结果', icon: 'CircleCheck' } },
  { path: '/ep/skeleton', name: 'EpSkeleton', component: SkeletonDemo, meta: { title: 'EP-骨架屏', icon: 'Loading' } },
  // 新增导航组件
  { path: '/ep/breadcrumb', name: 'EpBreadcrumb', component: BreadcrumbDemo, meta: { title: 'EP-面包屑', icon: 'ArrowRight' } },
  { path: '/ep/steps', name: 'EpSteps', component: StepsDemo, meta: { title: 'EP-步骤条', icon: 'List' } },
  { path: '/ep/affix', name: 'EpAffix', component: AffixDemo, meta: { title: 'EP-固钉', icon: 'Pin' } },
  { path: '/ep/backtop', name: 'EpBacktop', component: BacktopDemo, meta: { title: 'EP-回到顶部', icon: 'ArrowUp' } },
  // 新增其他组件
  { path: '/ep/divider', name: 'EpDivider', component: DividerDemo, meta: { title: 'EP-分割线', icon: 'Minus' } },
  { path: '/ep/config-provider', name: 'EpConfigProvider', component: ConfigProviderDemo, meta: { title: 'EP-全局配置', icon: 'Setting' } },
  // 新增表单组件
  { path: '/ep/transfer', name: 'EpTransfer', component: TransferDemo, meta: { title: 'EP-穿梭框', icon: 'Sort' } },
  { path: '/ep/tree-select', name: 'EpTreeSelect', component: TreeSelectDemo, meta: { title: 'EP-树形选择器', icon: 'List' } },
  { path: '/ep/cascader', name: 'EpCascader', component: CascaderDemo, meta: { title: 'EP-级联选择器', icon: 'Connection' } },
  { path: '/ep/autocomplete', name: 'EpAutocomplete', component: AutocompleteDemo, meta: { title: 'EP-自动补全', icon: 'Search' } },
  { path: '/ep/carousel', name: 'EpCarousel', component: CarouselDemo, meta: { title: 'EP-走马灯', icon: 'Picture' } },
  { path: '/ep/popover', name: 'EpPopover', component: PopoverDemo, meta: { title: 'EP-弹出框', icon: 'ChatDotSquare' } },
  { path: '/ep/tooltip', name: 'EpTooltip', component: TooltipDemo, meta: { title: 'EP-文字提示', icon: 'InfoFilled' } },
  { path: '/ep/anchor', name: 'EpAnchor', component: AnchorDemo, meta: { title: 'EP-锚点', icon: 'Link' } },
  { path: '/ep/dropdown', name: 'EpDropdown', component: DropdownDemo, meta: { title: 'EP-下拉菜单', icon: 'ArrowDown' } },
  { path: '/ep/page-header', name: 'EpPageHeader', component: PageHeaderDemo, meta: { title: 'EP-页头', icon: 'Document' } },
  { path: '/ep/drawer', name: 'EpDrawer', component: DrawerDemo, meta: { title: 'EP-抽屉', icon: 'Menu' } },
  { path: '/ep/popconfirm', name: 'EpPopconfirm', component: PopconfirmDemo, meta: { title: 'EP-气泡确认框', icon: 'QuestionFilled' } },
  { path: '/ep/tree', name: 'EpTree', component: TreeDemo, meta: { title: 'EP-树形控件', icon: 'List' } },
  { path: '/message-center', name: 'MessageCenter', component: MessageCenter, meta: { title: '开发记录', icon: 'Bell' } },
  { path: '/personal-docs', name: 'PersonalDocs', component: PersonalDocs, meta: { title: '个人技术文档', icon: 'Document' } },
  { path: '/personal-docs/frontend', name: 'PersonalDocsFrontend', component: PersonalDocsCategory, meta: { title: '前端技术', icon: 'Monitor' } },
  { path: '/personal-docs/backend', name: 'PersonalDocsBackend', component: PersonalDocsCategory, meta: { title: '后端技术', icon: 'Server' } },
  { path: '/personal-docs/database', name: 'PersonalDocsDatabase', component: PersonalDocsCategory, meta: { title: '数据库技术', icon: 'Coin' } },
  { path: '/personal-docs/devops', name: 'PersonalDocsDevops', component: PersonalDocsCategory, meta: { title: '运维部署', icon: 'Setting' } },
  { path: '/personal-docs/tools', name: 'PersonalDocsTools', component: PersonalDocsCategory, meta: { title: '开发工具', icon: 'Tools' } },
  { path: '/personal-docs/notes', name: 'PersonalDocsNotes', component: PersonalDocsCategory, meta: { title: '随记文档', icon: 'EditPen' } },
  
  // 404 页面路由
  { path: '/404', name: 'NotFound', component: NotFound, meta: { title: '页面未找到' } },
  
  // 捕获所有未匹配的路由，重定向到404页面
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导入用户状态管理
import { useUserStore } from '../store/userStore'

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  try {
    // 获取用户store实例
    const userStore = useUserStore()
    
    // 设置页面标题
    if (to.meta?.title) {
      document.title = `${to.meta.title} - 浩南知识库演示系统`
    } else {
      document.title = '浩南知识库演示系统'
    }
    
    // 延长登录时间（如果已登录）
    if (userStore.isLoggedIn) {
      userStore.extendLoginTime()
    }
    
    // 允许访问所有路由，登录检查由 App.vue 处理
    next()
    
  } catch (error) {
    console.error('路由守卫执行出错:', error)
    ElMessage.error('页面加载出错，请刷新页面重试')
    next(false) // 取消导航
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  // 记录页面访问日志
  console.log(`页面跳转: ${from.path} -> ${to.path}`)
  
  // 页面切换完成后的处理
  // 例如：记录用户行为、统计数据等
  
  // 滚动到页面顶部
  window.scrollTo(0, 0)
})

export default router
