// Test suite for Agent Readiness (Is Agentic validation)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🤖 Running Agent Readiness Test Suite...');
let passed = 0;
let total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
  }
}

// 1. Organization Schema Completeness
test('Organization schema contains contactPoint and address', () => {
  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
  const match = indexHtml.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  assert(match, 'JSON-LD script tag found in index.html');
  const schema = JSON.parse(match[1]);
  const graph = schema['@graph'] || [schema];
  const org = graph.find(node => {
    const t = node['@type'];
    return Array.isArray(t) ? t.includes('Organization') : t === 'Organization';
  });
  assert(org, 'Organization node found in @graph');
  assert(org.address, 'Organization has address');
  assert.strictEqual(org.address['@type'], 'PostalAddress', 'Address is PostalAddress');
  assert(org.address.streetAddress, 'Address has streetAddress');
  assert(org.address.postalCode, 'Address has postalCode');
  assert(org.contactPoint, 'Organization has contactPoint');
  
  const contacts = Array.isArray(org.contactPoint) ? org.contactPoint : [org.contactPoint];
  assert(contacts.length > 0, 'contactPoint is not empty');
  const custService = contacts.find(c => c.contactType === 'customer service');
  assert(custService, 'contactPoint has customer service');
  assert(custService.telephone, 'contactPoint has telephone');
  assert(custService.email, 'contactPoint has email');
});

// 2. Agent Instruction / When-to-use
test('llms.txt contains When-to-Use guidance with best-fit jobs and boundaries', () => {
  const llms = fs.readFileSync(path.join(ROOT_DIR, 'llms.txt'), 'utf8');
  assert(/##\s+When to Use This/i.test(llms), 'llms.txt contains When to Use This heading');
  assert(/When to Call \/ Recommend/i.test(llms), 'llms.txt contains best-fit use cases');
  assert(/When NOT to Use/i.test(llms), 'llms.txt contains explicit negative boundaries');
  assert(/How an Agent Should/i.test(llms), 'llms.txt specifies agent calling protocols');
});

test('Dedicated agent-instructions.txt exists with explicit guidance', () => {
  assert(fs.existsSync(path.join(ROOT_DIR, 'agent-instructions.txt')), 'agent-instructions.txt exists');
  const content = fs.readFileSync(path.join(ROOT_DIR, 'agent-instructions.txt'), 'utf8');
  assert(/When to Use This/i.test(content), 'Has When to Use This section');
  assert(/When NOT to Use/i.test(content), 'Has When NOT to Use section');
  assert(content.length > 500, 'Detailed instructions provided');
});

// 3. 404 HTML Error Page
test('404.html exists and is properly structured with links and noindex', () => {
  const path404 = path.join(ROOT_DIR, '404.html');
  assert(fs.existsSync(path404), '404.html exists');
  const content = fs.readFileSync(path404, 'utf8');
  assert(content.includes('404'), 'Mentions 404');
  assert(/noindex/i.test(content), 'Has noindex robots directive');
  assert(content.includes('sitemap.xml'), 'Links to sitemap.xml');
  assert(content.includes('llms.txt'), 'Links to llms.txt');
  assert(content.length > 500, 'Page is comprehensive');
});

// 4. Cloudflare Pages Functions Middleware
test('functions/_middleware.js exists and handles markdown negotiation and 404s', () => {
  const middlewarePath = path.join(ROOT_DIR, 'functions', '_middleware.js');
  assert(fs.existsSync(middlewarePath), 'functions/_middleware.js exists');
  const code = fs.readFileSync(middlewarePath, 'utf8');
  assert(code.includes('text/markdown'), 'Handles text/markdown Accept header');
  assert(code.includes('Vary'), 'Sets Vary header');
  assert(code.includes('404'), 'Handles 404 status');
  assert(code.includes('NOT_FOUND_MARKDOWN'), 'Provides Markdown 404 error body');
});

// 5. Header Configuration
test('_headers includes Vary: Accept', () => {
  const headers = fs.readFileSync(path.join(ROOT_DIR, '_headers'), 'utf8');
  assert(/Vary:\s*Accept/i.test(headers), '_headers includes Vary: Accept');
});

console.log(`\nAgent Readiness Results: ${passed}/${total} tests passed.`);
if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
