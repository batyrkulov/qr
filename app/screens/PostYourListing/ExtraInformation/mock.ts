import { CategorySectionTypes, ExtraInformationBlockTypeEnum } from "../../../api/post"

export const tradingSections = [
  {
    id: 1,
    category_section_type: { id: 1, name: CategorySectionTypes.ADD },
    section: {
      id: 1,
      section_description: { id: 1, name: "Features" },
      section_block: [
        {
          id: 1,
          block: {
            id: 1,
            slug: "year",
            is_required: true,
            range_min: null,
            range_max: null,
            block_type: { id: 4, name: ExtraInformationBlockTypeEnum.YEAR },
            block_description: { id: 1, name: "Year", placeholder: "Select Year" },
            item: [
              {
                id: 92,
                image_url: null,
                value: "Year-none",
                item_description: { id: 183, name: "" },
              },
            ],
          },
        },
        {
          id: 2,
          block: {
            id: 2,
            slug: "color_exterior",
            is_required: true,
            range_min: null,
            range_max: null,
            block_type: { id: 1, name: ExtraInformationBlockTypeEnum.SELECT },
            block_description: {
              id: 3,
              name: "Color Exterior",
              placeholder: "Select Color Exterior",
            },
            item: [
              {
                id: 1,
                image_url: null,
                value: "White",
                item_description: { id: 1, name: "White" },
              },
              {
                id: 2,
                image_url: null,
                value: "Black",
                item_description: { id: 2, name: "Black" },
              },
              { id: 3, image_url: null, value: "Red", item_description: { id: 3, name: "Red" } },
              {
                id: 4,
                image_url: null,
                value: "Silver",
                item_description: { id: 4, name: "Silver" },
              },
              {
                id: 5,
                image_url: null,
                value: "Maroon",
                item_description: { id: 5, name: "Maroon" },
              },
              { id: 6, image_url: null, value: "Blue", item_description: { id: 6, name: "Blue" } },
              {
                id: 7,
                image_url: null,
                value: "Sky Blue",
                item_description: { id: 7, name: "Sky blue" },
              },
              {
                id: 8,
                image_url: null,
                value: "Dark Blue",
                item_description: { id: 8, name: "Dark blue" },
              },
              {
                id: 9,
                image_url: null,
                value: "Yellow",
                item_description: { id: 9, name: "Yellow" },
              },
              {
                id: 10,
                image_url: null,
                value: "Green",
                item_description: { id: 10, name: "Green" },
              },
              {
                id: 11,
                image_url: null,
                value: "Golder",
                item_description: { id: 11, name: "Golden" },
              },
              {
                id: 12,
                image_url: null,
                value: "Orange",
                item_description: { id: 12, name: "Orange" },
              },
              {
                id: 13,
                image_url: null,
                value: "Purple",
                item_description: { id: 13, name: "Purple" },
              },
              {
                id: 14,
                image_url: null,
                value: "Dark Violet",
                item_description: { id: 14, name: "Dark Violet" },
              },
              {
                id: 15,
                image_url: null,
                value: "Bronze",
                item_description: { id: 15, name: "Bronze" },
              },
              {
                id: 16,
                image_url: null,
                value: "Brown",
                item_description: { id: 16, name: "Brown" },
              },
              {
                id: 17,
                image_url: null,
                value: "Turquoise",
                item_description: { id: 17, name: "Turquoise" },
              },
              {
                id: 18,
                image_url: null,
                value: "Beige",
                item_description: { id: 18, name: "Beige" },
              },
              {
                id: 19,
                image_url: null,
                value: "Olive",
                item_description: { id: 19, name: "Olive" },
              },
            ],
          },
        },
        {
          id: 3,
          block: {
            id: 3,
            slug: "color_interior",
            is_required: false,
            range_min: null,
            range_max: null,
            block_type: { id: 1, name: ExtraInformationBlockTypeEnum.SELECT },
            block_description: {
              id: 5,
              name: "Color Interior",
              placeholder: "Select Color Interior",
            },
            item: [
              {
                id: 20,
                image_url: null,
                value: "Beige",
                item_description: { id: 39, name: "Beige" },
              },
              {
                id: 21,
                image_url: null,
                value: "Black",
                item_description: { id: 41, name: "Black" },
              },
              {
                id: 22,
                image_url: null,
                value: "White",
                item_description: { id: 43, name: "White" },
              },
              { id: 23, image_url: null, value: "Tan", item_description: { id: 45, name: "Tan" } },
              {
                id: 24,
                image_url: null,
                value: "Gray",
                item_description: { id: 47, name: "Gray" },
              },
              {
                id: 25,
                image_url: null,
                value: "Maroon",
                item_description: { id: 49, name: "Maroon" },
              },
              {
                id: 26,
                image_url: null,
                value: "Silver",
                item_description: { id: 51, name: "Silver" },
              },
            ],
          },
        },
        {
          id: 4,
          block: {
            id: 4,
            slug: "mileage",
            is_required: true,
            range_min: null,
            range_max: null,
            block_type: { id: 6, name: ExtraInformationBlockTypeEnum.INPUT_NUMBER },
            block_description: { id: 7, name: "Mileage", placeholder: "Select Mileage" },
            item: [
              {
                id: 93,
                image_url: null,
                value: "Mileage-none",
                item_description: { id: 185, name: "" },
              },
            ],
          },
        },
        {
          id: 5,
          block: {
            id: 5,
            slug: "import_country",
            is_required: true,
            range_min: null,
            range_max: null,
            block_type: { id: 1, name: ExtraInformationBlockTypeEnum.SELECT },
            block_description: { id: 9, name: "Import Country", placeholder: "Chose Country" },
            item: [
              {
                id: 27,
                image_url: null,
                value: "Gulf",
                item_description: { id: 53, name: "Gulf" },
              },
              {
                id: 28,
                image_url: null,
                value: "Kuwait",
                item_description: { id: 55, name: "Kuwait" },
              },
              {
                id: 29,
                image_url: null,
                value: "German",
                item_description: { id: 57, name: "German" },
              },
              { id: 30, image_url: null, value: "USA", item_description: { id: 59, name: "USA" } },
              {
                id: 31,
                image_url: null,
                value: "Japan",
                item_description: { id: 61, name: "Japan" },
              },
            ],
          },
        },
        {
          id: 6,
          block: {
            id: 6,
            slug: "body_type",
            is_required: false,
            range_min: null,
            range_max: null,
            block_type: { id: 1, name: ExtraInformationBlockTypeEnum.SELECT },
            block_description: { id: 11, name: "Body", placeholder: "Select Body Type" },
            item: [
              {
                id: 32,
                image_url: null,
                value: "Classic",
                item_description: { id: 63, name: "Classic" },
              },
              { id: 33, image_url: null, value: "Suv", item_description: { id: 65, name: "Suv" } },
              {
                id: 34,
                image_url: null,
                value: "Pickup",
                item_description: { id: 67, name: "Pickup" },
              },
              {
                id: 35,
                image_url: null,
                value: "Sport",
                item_description: { id: 69, name: "Sport" },
              },
              {
                id: 36,
                image_url: null,
                value: "Sedan",
                item_description: { id: 71, name: "Sedan" },
              },
              {
                id: 37,
                image_url: null,
                value: "Economy",
                item_description: { id: 73, name: "Economy" },
              },
              {
                id: 38,
                image_url: null,
                value: "Upgraded",
                item_description: { id: 75, name: "Upgraded" },
              },
              {
                id: 39,
                image_url: null,
                value: "Minivan",
                item_description: { id: 77, name: "Minivan" },
              },
              {
                id: 40,
                image_url: null,
                value: "Caravan",
                item_description: { id: 79, name: "Caravan" },
              },
            ],
          },
        },
      ],
    },
  },
  {
    id: 2,
    category_section_type: { id: 1, name: CategorySectionTypes.ADD },
    section: {
      id: 2,
      section_description: { id: 3, name: "Selections" },
      section_block: [
        {
          id: 7,
          block: {
            id: 7,
            slug: "transmission",
            is_required: true,
            range_min: null,
            range_max: null,
            block_type: { id: 3, name: ExtraInformationBlockTypeEnum.RADIO },
            block_description: { id: 13, name: "Transmission", placeholder: null },
            item: [
              {
                id: 41,
                image_url: null,
                value: "Automatic",
                item_description: { id: 81, name: "Automatic" },
              },
              {
                id: 42,
                image_url: null,
                value: "Manual",
                item_description: { id: 83, name: "Manual" },
              },
              {
                id: 43,
                image_url: null,
                value: "Triptronic",
                item_description: { id: 85, name: "Triptronic" },
              },
            ],
          },
        },
        {
          id: 8,
          block: {
            id: 8,
            slug: "cylinders",
            is_required: false,
            range_min: null,
            range_max: null,
            block_type: { id: 3, name: ExtraInformationBlockTypeEnum.RADIO },
            block_description: { id: 15, name: "Cylinders", placeholder: null },
            item: [
              { id: 44, image_url: null, value: "4", item_description: { id: 87, name: "4" } },
              { id: 45, image_url: null, value: "5", item_description: { id: 89, name: "5" } },
              { id: 46, image_url: null, value: "6", item_description: { id: 91, name: "6" } },
              { id: 47, image_url: null, value: "8", item_description: { id: 93, name: "8" } },
              { id: 48, image_url: null, value: "10", item_description: { id: 95, name: "10" } },
              { id: 49, image_url: null, value: "12", item_description: { id: 97, name: "12" } },
            ],
          },
        },
        {
          id: 9,
          block: {
            id: 9,
            slug: "condition",
            is_required: false,
            range_min: null,
            range_max: null,
            block_type: { id: 3, name: ExtraInformationBlockTypeEnum.RADIO },
            block_description: { id: 17, name: "Condition", placeholder: null },
            item: [
              {
                id: 50,
                image_url: null,
                value: "Excellent",
                item_description: { id: 99, name: "Excellent" },
              },
              {
                id: 51,
                image_url: null,
                value: "Very good",
                item_description: { id: 101, name: "Very good" },
              },
              {
                id: 52,
                image_url: null,
                value: "Good",
                item_description: { id: 103, name: "Good" },
              },
              {
                id: 53,
                image_url: null,
                value: "Acceptable",
                item_description: { id: 105, name: "Acceptable" },
              },
            ],
          },
        },
        {
          id: 10,
          block: {
            id: 10,
            slug: "additional_features",
            is_required: false,
            range_min: null,
            range_max: null,
            block_type: { id: 2, name: ExtraInformationBlockTypeEnum.CHECKBOX_WITH_PICTURES },
            block_description: { id: 19, name: "Additional features", placeholder: null },
            item: [
              {
                id: 54,
                image_url: null,
                value: "Quick Selling",
                item_description: { id: 107, name: "Quick Selling" },
              },
              {
                id: 55,
                image_url: null,
                value: "Insured",
                item_description: { id: 109, name: "Insured" },
              },
              {
                id: 56,
                image_url: null,
                value: "Full option",
                item_description: { id: 111, name: "Full option" },
              },
              {
                id: 57,
                image_url: null,
                value: "Dealership",
                item_description: { id: 113, name: "Dealership" },
              },
              {
                id: 58,
                image_url: null,
                value: "Under warranty",
                item_description: { id: 115, name: "Under warranty" },
              },
              {
                id: 59,
                image_url: null,
                value: "Inspected",
                item_description: { id: 117, name: "Inspected" },
              },
            ],
          },
        },
      ],
    },
  },
  {
    id: 3,
    category_section_type: { id: 1, name: CategorySectionTypes.ADD },
    section: {
      id: 3,
      section_description: { id: 5, name: "Advanced" },
      section_block: [
        {
          id: 11,
          block: {
            id: 11,
            slug: "fuel_type",
            is_required: false,
            range_min: null,
            range_max: null,
            block_type: { id: 3, name: ExtraInformationBlockTypeEnum.RADIO },
            block_description: { id: 21, name: "Fuel Type", placeholder: null },
            item: [
              {
                id: 60,
                image_url: null,
                value: "Gasoline",
                item_description: { id: 119, name: "Gasoline" },
              },
              {
                id: 61,
                image_url: null,
                value: "Diesel",
                item_description: { id: 121, name: "Diesel" },
              },
              {
                id: 62,
                image_url: null,
                value: "Hybrid",
                item_description: { id: 123, name: "Hybrid" },
              },
              {
                id: 63,
                image_url: null,
                value: "Electric",
                item_description: { id: 125, name: "Electric" },
              },
              {
                id: 64,
                image_url: null,
                value: "Flex fuel",
                item_description: { id: 127, name: "Flex fuel" },
              },
              {
                id: 65,
                image_url: null,
                value: "Hydrogen Fuel Cell",
                item_description: { id: 129, name: "Hydrogen Fuel Cell" },
              },
              {
                id: 66,
                image_url: null,
                value: "Natural gas",
                item_description: { id: 131, name: "Natural gas" },
              },
            ],
          },
        },
        {
          id: 12,
          block: {
            id: 12,
            slug: "seats_material",
            is_required: false,
            range_min: null,
            range_max: null,
            block_type: { id: 3, name: ExtraInformationBlockTypeEnum.RADIO },
            block_description: { id: 23, name: "Seats material", placeholder: null },
            item: [
              {
                id: 67,
                image_url: null,
                value: "Nylon",
                item_description: { id: 133, name: "Nylon" },
              },
              {
                id: 68,
                image_url: null,
                value: "Polyester",
                item_description: { id: 135, name: "Polyester" },
              },
              {
                id: 69,
                image_url: null,
                value: "Alcantara",
                item_description: { id: 137, name: "Alcantara" },
              },
              {
                id: 70,
                image_url: null,
                value: "Vinyl",
                item_description: { id: 139, name: "Vinyl" },
              },
              {
                id: 71,
                image_url: null,
                value: "Faux leather",
                item_description: { id: 141, name: "Faux leather" },
              },
              {
                id: 72,
                image_url: null,
                value: "Leather",
                item_description: { id: 143, name: "Leather" },
              },
            ],
          },
        },
        {
          id: 13,
          block: {
            id: 13,
            slug: "sunroof",
            is_required: false,
            range_min: null,
            range_max: null,
            block_type: { id: 3, name: ExtraInformationBlockTypeEnum.RADIO },
            block_description: { id: 25, name: "Sunroof", placeholder: null },
            item: [
              {
                id: 73,
                image_url: null,
                value: "None",
                item_description: { id: 145, name: "None" },
              },
              {
                id: 74,
                image_url: null,
                value: "Normal",
                item_description: { id: 147, name: "Normal" },
              },
              {
                id: 75,
                image_url: null,
                value: "Panoramic",
                item_description: { id: 149, name: "Panoramic" },
              },
            ],
          },
        },
        {
          id: 14,
          block: {
            id: 14,
            slug: "more_features",
            is_required: false,
            range_min: null,
            range_max: null,
            block_type: { id: 8, name: ExtraInformationBlockTypeEnum.CHECKBOX_WITH_PICTURES },
            block_description: { id: 27, name: "More features", placeholder: null },
            item: [
              {
                id: 76,
                image_url: "https://q8rider-static.s3.me-south-1.amazonaws.com/items/bluetooth.png",
                value: "Bluetooth",
                item_description: { id: 151, name: "Bluetooth" },
              },
              {
                id: 77,
                image_url:
                  "https://q8rider-static.s3.me-south-1.amazonaws.com/items/side-airbag.png",
                value: "Side airbag",
                item_description: { id: 153, name: "Side airbag" },
              },
              {
                id: 78,
                image_url:
                  "https://q8rider-static.s3.me-south-1.amazonaws.com/items/temperature.png",
                value: "Temperature",
                item_description: { id: 155, name: "Temperature" },
              },
              {
                id: 79,
                image_url:
                  "https://q8rider-static.s3.me-south-1.amazonaws.com/items/anti-theft-alarm.png",
                value: "Anti-theft alarm",
                item_description: { id: 157, name: "Anti-theft alarm" },
              },
              {
                id: 80,
                image_url:
                  "https://q8rider-static.s3.me-south-1.amazonaws.com/items/dealership.png",
                value: "Dealership",
                item_description: { id: 159, name: "Dealership" },
              },
              {
                id: 81,
                image_url:
                  "https://q8rider-static.s3.me-south-1.amazonaws.com/items/full-option.png",
                value: "Full option",
                item_description: { id: 161, name: "Full option" },
              },
              {
                id: 82,
                image_url: "https://q8rider-static.s3.me-south-1.amazonaws.com/items/inspected.png",
                value: "Inspected",
                item_description: { id: 163, name: "Inspected" },
              },
              {
                id: 83,
                image_url:
                  "https://q8rider-static.s3.me-south-1.amazonaws.com/items/parking-sensors.png",
                value: "Parking sensors",
                item_description: { id: 165, name: "Parking sensors" },
              },
              {
                id: 84,
                image_url:
                  "https://q8rider-static.s3.me-south-1.amazonaws.com/items/front-airbag.png",
                value: "Front airbags",
                item_description: { id: 167, name: "Front airbags" },
              },
              {
                id: 85,
                image_url:
                  "https://q8rider-static.s3.me-south-1.amazonaws.com/items/self-parking.png",
                value: "Self parking",
                item_description: { id: 169, name: "Self parking" },
              },
              {
                id: 86,
                image_url:
                  "https://q8rider-static.s3.me-south-1.amazonaws.com/items/navigation.png",
                value: "Navigation",
                item_description: { id: 171, name: "Navigation" },
              },
              {
                id: 87,
                image_url:
                  "https://q8rider-static.s3.me-south-1.amazonaws.com/items/under-warrantly.png",
                value: "Under warrantly",
                item_description: { id: 173, name: "Under warrantly" },
              },
            ],
          },
        },
      ],
    },
  },
]
