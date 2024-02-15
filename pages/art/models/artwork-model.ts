import {en, Faker} from "@faker-js/faker";

export class ArtworkModel {
    artWorkName: string;
    edition: ArtworkEdition;
    edition_number: number = 0;
    description: string;
    currentPrice: [number, TestCurrency];
    priceAtPrimarySale: [number, TestCurrency];
    dateAtPrimarySale: Date;
    primarySaleBuyer: string;
    styleOfArtwork: ArtWorkStyle;
    NFTGenesis: number;
    supply: string;
    collaborator: string;
    ownedBy: string;
    theMarketplaceMintedOn: MarketPlace;
    mintedOn: Date;
    createdOn: Date;
    copyright: string;
    artistRoyalty: boolean;
    isThereAPhysicalPiece: boolean;


    constructor() {
    }


    requireFieldsInit() {
        let faker = new Faker({locale: en});
        this.artWorkName = "ArtworkName_" + faker.string.alphanumeric(10);
        this.edition = this.randomEnumValue(ArtworkEdition);
        if (this.edition === ArtworkEdition.MULTIPLE_EDITION){
            this.edition_number = faker.number.int({min: 2, max: 5});
        }
        this.description = faker.lorem.lines(3);
        this.currentPrice = [faker.number.float({max: 500, min: 100}), this.randomEnumValue(TestCurrency)];
        // let style = (<ArtWorkStyle>this.randomEnumValue(ArtWorkStyle)).toString().split("_").join(" ");
        this.styleOfArtwork = this.randomEnumValue(ArtWorkStyle);
        this.NFTGenesis = faker.number.int({min: 2017, max: 2023});
        this.supply = this.randomEnumValue(Supply);
        this.artistRoyalty = Boolean(faker.number.int({min: 0, max: 1}));
    }

    private randomEnumValue(enumeration: any) {
        const values = Object.keys(enumeration);
        const enumKey = values[Math.floor(Math.random() * values.length)];
        return enumeration[enumKey];
    }

    generateArtwork() {
        let faker = new Faker({locale: en});
        this.requireFieldsInit();
        this.priceAtPrimarySale = [faker.number.float({max: 500, min: 100}), this.randomEnumValue(TestCurrency)];
        this.dateAtPrimarySale = faker.date.future({years: 1, refDate: Date.now()});
        this.primarySaleBuyer = faker.person.fullName();
        this.collaborator = faker.person.fullName();
        this.ownedBy = faker.person.fullName();
        this.theMarketplaceMintedOn = this.randomEnumValue(MarketPlace);
        this.mintedOn = faker.date.future({years: 1, refDate: Date.now()});
        this.createdOn = faker.date.future({years: 1, refDate: Date.now()});
        this.isThereAPhysicalPiece = Boolean(faker.number.int({min: 0, max: 1}));
    }


}

export enum Supply {
    LESS_THEN_10_YEARS = "< 10 /year",
    FROM_10_TO_24_YEARS = "10 - 24 /year",
    FROM_25_TO_49_YEARS = "25 - 49 /year",
    FROM_50_TO_99_YEARS = "50 - 99 /year",
    MORE_THEN_100_YEARS = "> 100 /year",
}

export enum ArtworkEdition {
    LIMITED_EDITION = "Limited Edition",
    ONE_ONE_EDITION = "1/1 Edition",
    MULTIPLE_EDITION = "Multiple Edition",
    OPEN_EDITION = "Open Edition",
}

export enum TestCurrency {
    ETH,
    ARB,
    MATIC,
    Tezos,
    USD
}

export enum ArtWorkStyle {
    Abstract = "Abstract",
    Cubism = "Cubism",
    Pop_Art = "Pop Art",
    Surrealism = "Surrealism",
    Minimalism = "Minimalism",
    Portraits = "Portraits",
    Macro = "Macro",
    Fashion = "Fashion",
    Meme = "Meme",
    Astral = "Astral",
    Other = "Other"
}

export enum MarketPlace {
    OpenSea,
    SuperRare,
    Foundation,
}