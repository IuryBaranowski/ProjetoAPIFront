import { http } from './api'

export default {

  findAll() => {
    return http.get('items');
  },

  findById: (items) => {
    return http.get(`items/${item.id}`, { data: item });
  },

  save: (item) => {
    return http.post('items', item);
  },

  delete: (item) => {
    return http.delete(`items/${item.id}`, { data: item });
  },

  upadte: (item) => {
    return http.put(`items`, item);
  }
}
