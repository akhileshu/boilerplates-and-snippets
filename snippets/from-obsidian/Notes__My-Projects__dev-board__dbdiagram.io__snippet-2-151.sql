Table Project {
  id UUID [pk]
  name VARCHAR
  category VARCHAR
  description TEXT
  gitRepo VARCHAR
  documentationLink VARCHAR
  hostedLink VARCHAR
  erdLink VARCHAR
  templateId UUID
  createdAt TIMESTAMP
  updatedAt TIMESTAMP
}

Table Milestone {
  id UUID [pk]
  name VARCHAR
  description TEXT
  startDate TIMESTAMP
  endDate TIMESTAMP
  status VARCHAR
  projectId UUID
  createdAt TIMESTAMP
  updatedAt TIMESTAMP
}

Table Feature {
  id UUID [pk]
  title VARCHAR
  what TEXT
  why TEXT
  how TEXT
  status VARCHAR
  milestoneId UUID
  projectId UUID
  createdAt TIMESTAMP
  updatedAt TIMESTAMP
}

Table Task {
  id UUID [pk]
  title VARCHAR
  description TEXT
  tags TEXT
  what TEXT
  why TEXT
  how TEXT
  status VARCHAR
  expectedOutcome TEXT
  actualOutcome VARCHAR
  pivotReason TEXT
  challenges TEXT
  decisionCriteria TEXT
  buildVsBuy TEXT
  shippingImperfect BOOLEAN
  improvementPlan TEXT
  resourcesUsed TEXT
  userFlowDiagram TEXT
  reusableAssetNote TEXT
  atomicTasks JSON
  startDate TIMESTAMP
  endDate TIMESTAMP
  featureId UUID
  assigneeId UUID
  reporterId UUID
  createdAt TIMESTAMP
  updatedAt TIMESTAMP
}

Table WorkLog {
  id UUID [pk]
  taskId UUID
  userId UUID
  startTime TIMESTAMP
  endTime TIMESTAMP
  duration INT
  comment TEXT
  createdAt TIMESTAMP
}

Table User {
  id UUID [pk]
  name VARCHAR
  email VARCHAR [unique]
  role VARCHAR
}

Table Comment {
  id UUID [pk]
  message TEXT
  authorId UUID
  projectId UUID
  createdAt TIMESTAMP
}

Table Template {
  id UUID [pk]
  type VARCHAR
  description TEXT
  tags TEXT
  guide TEXT
  createdAt TIMESTAMP
  updatedAt TIMESTAMP
}

Table Resource {
  id UUID [pk]
  name VARCHAR
  type VARCHAR
  url VARCHAR
  description TEXT
  templateId UUID
  createdAt TIMESTAMP
}

Table Calendar {
  id UUID [pk]
  name VARCHAR
  createdAt TIMESTAMP
  updatedAt TIMESTAMP
}

Table Timebox {
  id UUID [pk]
  title VARCHAR
  start TIMESTAMP
  end TIMESTAMP
  calendarId UUID
  taskId UUID
  createdAt TIMESTAMP
  updatedAt TIMESTAMP
}

Ref: Milestone.projectId > Project.id
Ref: Feature.milestoneId > Milestone.id
Ref: Feature.projectId > Project.id
Ref: Task.featureId > Feature.id
Ref: Task.assigneeId > User.id
Ref: Task.reporterId > User.id
Ref: WorkLog.taskId > Task.id
Ref: WorkLog.userId > User.id
Ref: Comment.authorId > User.id
Ref: Comment.projectId > Project.id
Ref: Project.templateId > Template.id
Ref: Resource.templateId > Template.id
Ref: Timebox.taskId > Task.id
Ref: Timebox.calendarId > Calendar.id
