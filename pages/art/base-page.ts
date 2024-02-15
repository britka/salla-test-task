import {expect, Page} from "@playwright/test";

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateTo(navigationItem: NavigationItem) {
        await this.page.locator("#" + navigationItem.valueOf())
            .locator("visible=true")
            .last()
            .click();
    }

    public async login(email: string, password: string) {
        await this.page.getByRole("link", {name: "Login"}).click();
    }

    public async logout() {
        await this.page.click("#dropdownDefaultButton");
        await this.page.getByRole("menu")
            .locator("button", {hasText: "Sign Out"})
            .click();
        await expect(this.page.getByRole("link", {name: "Login"})).toBeVisible({timeout: 30000});
    }

}

export enum NavigationItem {
    NFT_ARTISTS = "artists",
    ARTWORKS = "artworks",
    COLLECTORS = "collectors",
    BLOGS = "blogs",
    EVENTS = "events",
}