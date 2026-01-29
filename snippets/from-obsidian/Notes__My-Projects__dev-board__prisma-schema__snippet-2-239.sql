
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  DEVELOPER
  MANAGER
  CLIENT
}

enum MilestoneStatus {
  OPEN
  COMPLETED
  CANCELLED
}

enum FeatureStatus {
  PROPOSED
  APPROVED
  IN_PROGRESS
  COMPLETED
}

enum SubtaskStatus {
  OPEN
  APPROVED
  IN_DEVELOPMENT
  PARKED
  TESTING
  READY_FOR_BUILD
  DONE
}

enum OutcomeStatus {
  OK
  EXCEEDS
  FAILED
}

enum ResourceType {
  GIT_REPO
  DOC
  VIDEO
  TOOL
  ARTICLE
}

model Project {
  id                String      @id @default(uuid())
  name              String
  category          String                    // e.g., ecom, banking
  description       String?
  gitRepo           String?                   // Optional git repository link
  documentationLink String?                   // Optional project docs
  hostedLink        String?                   // Optional deployed URL
  erdLink           String?                   // ER diagram reference

  milestones        Milestone[]
  features          Feature[]
  comments          Comment[]

  templateId        String?
  template          Template? @relation(fields: [templateId], references: [id])

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
}

model Milestone {
  id          String           @id @default(uuid())
  name        String
  description String?
  startDate   DateTime?
  endDate     DateTime?
  status      MilestoneStatus  @default(OPEN)

  project     Project   @relation(fields: [projectId], references: [id])
  projectId   String
  features    Feature[]

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Feature {
  id           String         @id @default(uuid())
  title        String
  what         String         // Problem statement
  why          String         // Why this feature matters
  how          String         // Technical approach (summary)
  status       FeatureStatus  @default(PROPOSED)

  milestone    Milestone      @relation(fields: [milestoneId], references: [id])
  milestoneId  String
  project      Project        @relation(fields: [projectId], references: [id])
  projectId    String
  tasks        Task[]

  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
}

model Task {
  id                String     @id @default(uuid())
  title             String
  description       String?
  tags              String[]          // Grouping/filtering
  what              String            // Problem statement
  why               String            // Why this matters
  how               String            // Approach

  status            SubtaskStatus     @default(OPEN)

  expectedOutcome   String?
  actualOutcome     OutcomeStatus?
  pivotReason       String?

  challenges        String?
  decisionCriteria  String?
  buildVsBuy        String?
  shippingImperfect Boolean           @default(false)
  improvementPlan   String?

  resourcesUsed     String[]          // Libraries, tools, docs
  userFlowDiagram   String?           // Diagram or visual link
  reusableAssetNote String?
  atomicTasks       Json              // { api: [], db: [], ui: [] }

  startDate         DateTime?
  endDate           DateTime?

  featureId         String
  feature           Feature   @relation(fields: [featureId], references: [id])

  assigneeId        String?
  assignee          User?     @relation("AssignedTasks", fields: [assigneeId], references: [id])

  reporterId        String?
  reporter          User?     @relation("ReportedTasks", fields: [reporterId], references: [id])

  timeboxes         Timebox[]
  workLogs          WorkLog[]

  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

model WorkLog {
  id        String   @id @default(uuid())
  taskId    String
  task      Task     @relation(fields: [taskId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  startTime DateTime
  endTime   DateTime
  duration  Int       // In minutes
  comment   String?

  createdAt DateTime @default(now())
}

model User {
  id             String   @id @default(uuid())
  name           String
  email          String   @unique
  role           Role     @default(DEVELOPER)

  assignedTasks  Task[]   @relation("AssignedTasks")
  reportedTasks  Task[]   @relation("ReportedTasks")
  workLogs       WorkLog[]
}

model Comment {
  id         String   @id @default(uuid())
  message    String
  authorId   String
  author     User     @relation(fields: [authorId], references: [id])
  projectId  String
  project    Project  @relation(fields: [projectId], references: [id])
  createdAt  DateTime @default(now())
}

model Template {
  id             String      @id @default(uuid())
  type           String      // e.g., "ecom", "banking", etc.
  description    String?
  tags           String[]
  resources      Resource[]  // GitHub links, docs, etc.
  guide          String?     // Boilerplate setup guide
  sampleProjects Project[]   @relation("Project_templateIdToTemplate")

  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
}

model Resource {
  id          String        @id @default(uuid())
  name        String
  type        ResourceType
  url         String
  description String?
  templateId  String
  template    Template      @relation(fields: [templateId], references: [id])
  createdAt   DateTime      @default(now())
}

model Calendar {
  id        String     @id @default(uuid())
  name      String     // e.g., "Team Alpha Calendar"
  timeboxes Timebox[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model Timebox {
  id         String     @id @default(uuid())
  title      String?
  start      DateTime
  end        DateTime

  calendarId String
  calendar   Calendar   @relation(fields: [calendarId], references: [id])

  taskId     String
  task       Task       @relation(fields: [taskId], references: [id])

  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
}
