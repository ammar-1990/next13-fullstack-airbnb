import prisma from "../util/prismadb";

export type Props = {
  userId?: string;
  guestCount?: number;
  roomsCount?: number;
  bathroomsCount?: number;
  category?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
};

export default async function getListings(params: Props) {
  const {
    userId,
    guestCount,
    roomsCount,
    bathroomsCount,
    category,
    startDate,
    endDate,
    locationValue,
  } = params;
  let query: any = {};

  if (userId) {
    query.userId = userId;
  }
  if (category) {
    query.category = category;
  }

  if (roomsCount) {
    query.roomCount = {
      gte: +roomsCount,
    };
  }
  if (guestCount) {
    query.guestCount = {
      gte: +guestCount,
    };
  }
  if (bathroomsCount) {
    query.bathroomCount = {
      gte: +bathroomsCount,
    };
  }

  if (locationValue) {
    query.locationValue = locationValue;
  }

  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            {
              endDate: {
                gte: startDate,
              },
              startDate: {
                lte: startDate,
              },
            },
            {
              startDate:{lte:endDate},
              endDate:{gte:endDate}
            }
          ],
        },
      },
    };
  }

  try {
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((el) => ({
      ...el,
      createdAt: el.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);

    console.log(error);
  }
}
