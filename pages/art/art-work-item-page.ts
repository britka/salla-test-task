import {expect, Page} from "@playwright/test";
import {ArtworkModel} from "./models/artwork-model";
import {BasePage} from "./base-page";

export class ArtWorkItemPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    public async deleteWorkArt() {
        await this.page.click("#dropdownButton");
        await this.page.getByRole("menu").getByRole("button").click();
        await this.page.getByRole("button", {name: "Yes, Delete"}).click();
        await expect(this.page.getByRole("button", {name: "Yes, Delete"}))
            .toBeHidden({timeout: 30000});
        await this.page.reload();
    }

    public async editWorkArt() {

    }

    public async getArtworkInfo(): Promise<string> {
        await this.page
            .getByRole("tablist")
            .getByRole("tab", {name: "Info"})
            .click();
        let infoForm = this.page
            .getByRole("tabpanel")
            .filter({has: this.page.locator("[data-state='active']")});
        return await infoForm.locator(".editor-block").textContent();
    }

    public async addReview(title: string, reviewDetails: string) {
        await this.page
            .getByRole("tablist")
            .getByRole("tab", {name: "Reviews"})
            .click();
        let reviewForm = this.page
            .getByRole("tabpanel");
          //  .filter({has: this.page.locator("[data-state='active']")});
        await reviewForm
            .locator("#review-title")
            .fill(title);
        await reviewForm
            .locator("#review-detail")
            .fill(reviewDetails);
        await reviewForm
            .locator("button[type=submit]")
            .click();
        await expect(reviewForm.locator("button[type=submit]")).toBeVisible();
    }

    public async checkThatReviewIsVisible(title: string, reviewDetails: string) {
        let lastReview = this.page.locator(".write-review div.flex.flex-col").first();
        await expect(lastReview.locator(".text-lg")).toContainText(title);
        await expect(lastReview.locator(".text-sm")).toContainText(reviewDetails);
    }

    public async checkThatReviewIsNotVisible(title: string, reviewDetails: string) {
        let lastReview = this.page.locator(".write-review div.flex.flex-col");
        await expect(lastReview.locator(".text-lg", {hasText: title})).not.toBeVisible();
        await expect(lastReview.locator(".text-sm", {hasText: reviewDetails})).not.toBeVisible();
    }

    public async deleteReview(title: string) {
        await this.page
            .locator(".write-review div.flex.flex-col")
            .filter({has: this.page.locator(".text-lg", {hasText: title})})
            .locator("#dropdownButton")
            .click();
        await this.page.getByRole("menu")
            .getByRole("button", {name: "Delete Review"})
            .click();
        await this.page.getByRole("button", {name: "Yes, Delete"}).click();
        await expect(this.page.getByRole("button", {name: "Yes, Delete"}))
            .not
            .toBeVisible({timeout: 30000});
        await this.page.waitForTimeout(2000);
    }

    public async getArtworkDetails(): Promise<ArtworkModel> {
        return null;
    }

}