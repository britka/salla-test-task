import {NavigationItem} from "../pages/art/base-page";
import {en, Faker} from "@faker-js/faker";
import {test} from "../fuxtures/fixtures";


test('WorkArtTests', async ({artworkModel, application}) => {
    await application.artworks.checkIfArtworkIsPresent(artworkModel);
});


test("Delete art Work", async ({artworkModel, application}) => {
    await application.artworks.selectArtwork(artworkModel);
    await application.artwork.deleteWorkArt();
    await application.artwork.navigateTo(NavigationItem.ARTWORKS);
    await application.artworks.checkIfArtworkIsNotPresent(artworkModel);
})

test("Add review to artwork", async ({artworkModel, application}) => {
    let faker = new Faker({locale: en});
    let artworkReviewTitle = faker.lorem.lines(1);
    let artworkReviewDetails = faker.lorem.lines(3);
    await application.artworks.selectArtwork(artworkModel);
    await application.artwork.addReview(artworkReviewTitle, artworkReviewDetails);
    await application.artwork.checkThatReviewIsVisible(artworkReviewTitle, artworkReviewDetails);
    await application.artwork.deleteReview(artworkReviewTitle);
    await application.artwork.checkThatReviewIsNotVisible(artworkReviewTitle, artworkReviewDetails);
})