import axios from 'axios';

export class ApiService {
  #BASE_URL = 'https://pixabay.com/api/';
  #MY_KEY = '34196902-9a76ee909655beae22d37d39f';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchImages() {
    try {
      const response = await axios.get(this.#BASE_URL, {
        params: {
          key: this.#MY_KEY,
          q: this.searchQuery,
          image_type: `photo`,
          orientation: `horizontal`,
          safesearch: true,
          per_page: this.perPage,
          page: this.page,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
