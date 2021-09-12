import {
  create,
  edit,
  list,
  detail,
  enable,
  disable,
  del
} from '@/api/access/Role'

const actions = {
  create(commit, state){
    return new Promise((resolve, reject) => {
      const {
        id,
        pid,
        name,
        summary,
        order,
        able,
        del,
        createTime,
        updateTime,
        version,
      } = state
      create({
        id: id,
        pid: pid,
        name: name,
        summary: summary,
        order: order,
        able: able,
        del: del,
        createTime: createTime,
        updateTime: updateTime,
        version: version,
      }).then(response => {
      const data = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  },
  edit(commit, state){
    return new Promise((resolve, reject) => {
      const {
    id: id,
    pid: pid,
    name: name,
    summary: summary,
    order: order,
    able: able,
    del: del,
    createTime: createTime,
    updateTime: updateTime,
    version: version,
      } = state
      edit({
    id: id,
    pid: pid,
    name: name,
    summary: summary,
    order: order,
    able: able,
    del: del,
    createTime: createTime,
    updateTime: updateTime,
    version: version,
      }).then(response => {
      const data = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  },
  list(commit, query) {
    return new Promise((resolve, reject) => {
      list(query.page, query.scopes, query.sorts).then(response => {
      const data = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  },
  detail(commit, id){
    return new Promise((resolve, reject) => {
      detail(id).then(response => {
      const data = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  },
  enable(commit, ids){
    return new Promise((resolve, reject) => {
      enable(ids).then(response => {
      if (response.meta.code == 200) {
      resolve(response.data)
    }
  }).catch(error => {
      reject(error)
    })
  })
  },
  disable(commit, ids){
    return new Promise((resolve, reject) => {
      disable(ids).then(response => {
      const data = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  },
  del(commit, ids){
    return new Promise((resolve, reject) => {
      del(ids).then(response => {
      const data = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  }
}

export default {
  namespaced: true,
  actions
}
