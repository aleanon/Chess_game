import { Page } from './pages/page.js';

class Model {
    private currentPage: Page;

    constructor(page: Page) {
        this.currentPage = page;
    }

    setPage(page: Page): void {
        this.currentPage.hide();
        this.currentPage = page;
        this.currentPage.view();
    }

    getCurrentPage(): Page {
        return this.currentPage;
    }

    updateCurrentPage(): void {
        if (this.currentPage) {
            this.currentPage.update(this);
        }
    }
    view() {
        this.currentPage?.view()
    }
}

export { Model };
