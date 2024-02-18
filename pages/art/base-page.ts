import {expect, Page} from "@playwright/test";

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateTo(navigationItem: NavigationItem) {
        await expect(this.page.locator("#" + navigationItem.valueOf()).last()).toBeVisible();
        await this.page.locator("#" + navigationItem.valueOf())
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
    }

}

export enum NavigationItem {
    NFT_ARTISTS = "artists",
    ARTWORKS = "artworks",
    COLLECTORS = "collectors",
    BLOGS = "blogs",
    EVENTS = "events",
}