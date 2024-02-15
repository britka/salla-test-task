import {BasePage} from "./base-page";
import {expect, Page} from "@playwright/test";
import {ArtworkEdition, ArtworkModel} from "./models/artwork-model";


export class AddArtworksPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public async addArtworkWithRequiredFields(artworkModel: ArtworkModel) {
        // Name
        await this.page.fill("#artwork_name", artworkModel.artWorkName);
        // Edition
        await this.selectFromDropdown("Editions", artworkModel.edition.valueOf());
        if (artworkModel.edition === ArtworkEdition.MULTIPLE_EDITION) {
            await this.page.fill("#edition_number", artworkModel.edition_number.toString());
        }
        // Description
        let locator = this.page.locator("#editorblock").locator(".ce-paragraph");
        await locator.click();
        await locator.evaluate((node, value) => node.textContent = value, artworkModel.description)

        // Current price
        await this.page.locator("#current_price").fill(artworkModel.currentPrice[0].toFixed(2).toString());

        // Set style
        await this.selectFromDropdown("Style Of Artwork", artworkModel.styleOfArtwork.valueOf());

        //NFS Genesis
        await this.selectFromDropdown("NFT Genesis", artworkModel.NFTGenesis.toFixed(0).toString());

        // Supply
        await this.selectFromDropdown("Supply", artworkModel.supply.valueOf().toString());

        //Created on

        await this.page.locator("xpath=//*[contains(text(),'Created On')]/../button").click();
        await this.setDate(artworkModel.createdOn);
        //Artist Royalty
        let artistRoyalty: number = Number(artworkModel.artistRoyalty);
        await this.page.locator(`[name='artist_loyalty'][value='${artistRoyalty}']`).click();

        // Upload file
        // This is just for test
        await this.page.setInputFiles("input[type=file]", "./files/boots.jpg");

        let publish = this.page.getByRole("button", {name: "Publish"});
        await expect(publish).toBeEnabled({timeout: 60000});
        await publish.click();
    }

    private formatDateToString(date: Date): string {
        // Use Intl.DateTimeFormat for localized formatting
        return new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit', year: 'numeric'}).format(date);
    }

    private async selectFromDropdown(dropdownLabel: string, item: string) {

        await this.page.locator(`xpath=//*[contains(text(),'${dropdownLabel}')]/..//*[@aria-haspopup]/..`).click();
        await this.page.getByRole("option", {name: item}).click();
    }

    private async setDate(date: Date) {
        let dateTimeFormat = Intl
            .DateTimeFormat("en-US", {month: "long", year: 'numeric', day: "numeric"})
            .format(date)
            .replace(",", "")
            .split(" ");

        let monthYear = dateTimeFormat[0] + " " + dateTimeFormat[2];
        let day = dateTimeFormat[1];

        let datePicker = this.page.locator("[role=dialog]");
        let monthAndYear = datePicker.locator("[id^=react-day-picker]");
        let nextMonth = datePicker.locator("[name='next-month']");

        while (true) {
            let monthYearText = await monthAndYear.textContent();
            if (monthYearText !== monthYear) {
                await nextMonth.click();
            } else {
                break;
            }
        }
        let dayOnDatePicker = datePicker
            .locator("[role=gridcell]:not(.text-neutral-500)")
            .filter({hasText: day}).first();
        await dayOnDatePicker.click();
    }


}
