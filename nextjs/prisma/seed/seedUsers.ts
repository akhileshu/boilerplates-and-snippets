/*
import { faker } from "@faker-js/faker";
import { PrismaClient, PersonaType, Weekday } from "@prisma/client";
const prisma = new PrismaClient();

const personas: PersonaType[] = [
  "LEARNER",
  "MENTOR",
  "COLLABORATOR",
  "SHOWCASER",
  "PRODUCT_IMPROVER",
  "NETWORKER",
];
const weekdays: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getRandom<T>(list: T[], count = 2): T[] {
  return faker.helpers.arrayElements(list, count);
}

const NUM_USERS = 1000;

export async function seedUsers() {
  for (let i = 0; i < 15; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email({ firstName: name.split(" ")[0] });
    const image = faker.image.avatar();
    const persona = faker.helpers.arrayElement(personas);
    const focus = faker.helpers.arrayElement(focusList);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        image,
        isProfileSetupDone: true,
      },
    });

    const preferredDays = getRandom(weekdays, 3);
    const startTime = "18:00";
    const endTime = "21:00";

    await prisma.userPreference.create({
      data: {
        userId: user.id,
        persona,
        userFocus: {
          // connect: { id: area.id },
          create: {
            focusId: focus.id,
            skills: {
              connect: getRandom(focus.skills).map((skill) => ({
                id: skill.id,
              })),
            },
            interests: {
              connect: getRandom(focus.interests).map((interest) => ({
                id: interest.id,
              })),
            },
          },
        },
        availability: {
          create: {
            preferredDays,
            startTime,
            endTime,
            prefersWeekends:
              preferredDays.includes("Saturday") ||
              preferredDays.includes("Sunday"),
          },
        },
      },
    });

    // 🔁 Connect random skills & interests (already seeded)
    // await prisma.userFocus.update({
    //   where: { id: area.id },
    //   data: {
    //     skills: {
    //       connect: getRandom(area.skills).map((skill) => ({ id: skill.id })),
    //     },
    //     interests: {
    //       connect: getRandom(area.interests).map((interest) => ({
    //         id: interest.id,
    //       })),
    //     },
    //   },
    // });

    console.log(`✅ Created user: ${name} (${email})`);
  }
}

*/