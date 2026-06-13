const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Citation report generator
function generateCitationReport() {
  const contentDir = path.join(process.cwd(), 'content');
  const reportsDir = path.join(process.cwd(), 'reports');
  
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Read citations from data file
  const citations = require('../src/data/citations').citations;
  
  // Map citations to pages that use them
  const citationUsage = new Map();
  
  // Scan all markdown files for citation references
  const files = scanMarkdownFiles(contentDir);
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const usedCitations: string[] = [];
    
    // Look for citation references
    citations.forEach(citation => {
      if (content.includes(citation.id) || content.includes(citation.url)) {
        usedCitations.push(citation.id);
      }
    });
    
    if (usedCitations.length > 0) {
      citationUsage.set(file, usedCitations);
    }
  }
  
  // Generate CSV report
  let csv = 'Citation ID,Title,URL,Publication Date,Authority Score,Used In Pages\n';
  
  citations.forEach(citation => {
    const pages: string[] = [];
    for (const [filePath, used] of citationUsage.entries()) {
      if (used.includes(citation.id)) {
        pages.push(path.relative(process.cwd(), filePath));
      }
    }
    
    csv += `"${citation.id}","${citation.title}","${citation.url}","${citation.publicationDate}",${citation.authorityScore},"${pages.join(', ')}"\n`;
  });
  
  const outputPath = path.join(reportsDir, 'citation-report.csv');
  fs.writeFileSync(outputPath, csv);
  
  console.log(`✅ Citation report generated: ${outputPath}`);
  console.log(`   Total citations: ${citations.length}`);
  console.log(`   Pages with citations: ${citationUsage.size}`);
}

function scanMarkdownFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      files.push(...scanMarkdownFiles(fullPath));
    } else if (item.isFile() && path.extname(item.name) === '.md') {
      files.push(fullPath);
    }
  }
  
  return files;
}

generateCitationReport();