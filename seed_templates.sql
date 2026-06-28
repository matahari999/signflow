-- Seed Data for SignFlow Templates

INSERT INTO templates (name, description, content) VALUES
(
  'Web Development Contract',
  'Standard contract for web development projects including scope, payment, and timeline.',
  '{
    "fields": [
      { "name": "clientName", "label": "Client Name", "type": "text", "required": true },
      { "name": "projectName", "label": "Project Name", "type": "text", "required": true },
      { "name": "amount", "label": "Project Amount ($)", "type": "number", "required": true },
      { "name": "dueDate", "label": "Completion Date", "type": "date", "required": true },
      { "name": "scope", "label": "Scope of Work", "type": "textarea", "required": true }
    ]
  }'
),
(
  'Freelance Design Contract',
  'Contract for graphic design or UI/UX projects with usage rights.',
  '{
    "fields": [
      { "name": "clientName", "label": "Client Name", "type": "text", "required": true },
      { "name": "projectName", "label": "Project Name", "type": "text", "required": true },
      { "name": "amount", "label": "Fee ($)", "type": "number", "required": true },
      { "name": "revisions", "label": "Allowed Revisions", "type": "number", "required": true },
      { "name": "deliveryDate", "label": "Delivery Date", "type": "date", "required": true }
    ]
  }'
),
(
  'Content Writing Contract',
  'Contract for freelance articles, blog posts, or copy.',
  '{
    "fields": [
      { "name": "clientName", "label": "Client Name", "type": "text", "required": true },
      { "name": "wordCount", "label": "Estimated Word Count", "type": "number", "required": true },
      { "name": "amount", "label": "Payment ($)", "type": "number", "required": true },
      { "name": "deadline", "label": "Submission Deadline", "type": "date", "required": true }
    ]
  }'
);
