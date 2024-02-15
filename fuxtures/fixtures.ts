import {test as base} from "@playwright/test";
import {ArtworkModel} from "../pages/art/models/artwork-model";
import {Application} from "../pages/application";
import {NavigationItem} from "../pages/art/base-page";

export const baseFixture = base.extend<{ artworkModel: ArtworkModel }>({
    artworkModel: async ({page}, use) => {
        const artwork = new ArtworkModel();
        artwork.generateArtwork();
        await use(artwork);
    },
})

export type DefaultUserOption = {
    defaultUser: {
        email: string;
        password: string;
    }
}

export const loginFixture = baseFixture.extend<DefaultUserOption & { login: Application }>({
    defaultUser: [{
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
    }, {option: true}],
    login: async ({defaultUser, page}, use) => {
        let application = new Application(page);
        await page.goto("/login");
        await application.login.login(defaultUser.email, defaultUser.password);
        await use(application);
        await application.main.logout();
    }
})

export const test = loginFixture.extend<DefaultUserOption & { application: Application }>({
    application: async ({login, artworkModel, page}, use) => {
        let application = new Application(page);
        await application.main.navigateTo(NavigationItem.ARTWORKS);
        await application.artworks.addArtWork();
        await application.addArtwork.addArtworkWithRequiredFields(artworkModel);
        await application.addArtwork.navigateTo(NavigationItem.ARTWORKS);

        await use(application);

        await application.main.navigateTo(NavigationItem.ARTWORKS);
        if (await application.artworks.isArtworkVisible(artworkModel)) {
            await application.artworks.selectArtwork(artworkModel);
            await application.artwork.deleteWorkArt();
        }
    }
})

