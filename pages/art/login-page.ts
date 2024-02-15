import {BasePage} from "./base-page";
import {expect, Page} from "@playwright/test";

export class LoginPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    public async login(email: string, password: string){
        if (this.page.context().browser().browserType().name() === "webkit")
            await this.page.waitForTimeout(2000);
            await expect(this.page.locator("#email")).toBeVisible({timeout: 30000});
        await this.page.fill("#email", email, {timeout: 30000});
        await this.page.fill("#password", password);
        await this.page.click("button[type=submit]");
    }
}