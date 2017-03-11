import {
  indigo700 as primary,
  indigo500 as tag,
  indigo100 as avatarBorder,
  grey300 as avatarBackground,
} from 'material-ui/styles/colors'

export const colors = {
  primary,
  tag,
  avatarBorder,
  avatarBackground,
}

export const tabsMap = {
  all: '全部',
  good: '精华',
  share: '分享',
  ask: '问答',
  job: '招聘',
}

export async function fetchAPI(url, options) {
  const res = await fetch(`https://cnodejs.org/api/v1${url}`, options)
  const json = await res.json()

  if (!json.success) {
    throw new Error(json.error_msg)
  }

  return json
}

export const tabs = Object.keys(tabsMap).map(key => ({
  key,
  value: tabsMap[key],
}))

export function getTagFromTopic({ top, good, tab }) {
  if (top) {
    return '置顶'
  }

  if (good) {
    return '精华'
  }

  return tabsMap[tab] || '未知'
}
