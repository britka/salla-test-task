import {BasePage} from "./base-page";
import {expect, Locator, Page} from "@playwright/test";
import {ArtworkModel} from "./models/artwork-model";

export class ArtWorksPage extends BasePage {

    artworkTiles: Locator;

    constructor(page: Page) {
        super(page);
        this.artworkTiles = this.page.locator("#artworks-list");
    }

    public async addArtWork() {
        await this.page.getByText("Add Artwork").click();
    }

    public async checkIfArtworkIsPresent(artWork: ArtworkModel) {
        await expect(this.artworkTiles.locator("h3").filter({hasText: artWork.artWorkName}))
            .toBeVisible();
    }

    public async checkIfArtworkIsNotPresent(artWork: ArtworkModel) {
        await expect(this.artworkTiles.locator("h3").filter({hasText: artWork.artWorkName}))
            .not.toBeVisible({timeout: 30000});
    }

    public async isArtworkVisible(artWork: ArtworkModel) {
        return await this.artworkTiles.locator("h3").filter({hasText: artWork.artWorkName}).isVisible()
    }


    async selectArtwork(artWork: ArtworkModel) {
        await this.artworkTiles
            .locator("h3")
            .filter({hasText: artWork.artWorkName})
            .click();
    }
}