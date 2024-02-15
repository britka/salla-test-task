import {Page} from "@playwright/test";
import {LoginPage} from "./art/login-page";
import {MainPage} from "./art/main-page";
import {ArtWorksPage} from "./art/art-works-page";
import {AddArtworksPage} from "./art/add-artworks-page";
import {ArtWorkItemPage} from "./art/art-work-item-page";

export class Application{
    page: Page;
    login: LoginPage;
    main: MainPage;
    artworks: ArtWorksPage;
    addArtwork: AddArtworksPage;
    artwork: ArtWorkItemPage;


    constructor(page: Page) {
        this.page = page;
        this.login = new LoginPage(page);
        this.addArtwork = new AddArtworksPage(page);
        this.artworks = new ArtWorksPage(page);
        this.artwork = new ArtWorkItemPage(page);
        this.main = new MainPage(page);
    }
}