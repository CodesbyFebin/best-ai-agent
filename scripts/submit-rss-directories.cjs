const fs = require('fs');

const SITE_URL = (process.env.SITE_URL || 'https://bestaiagent.in').replace(/\/$/, '');
const FEED_URL = `${SITE_URL}/feed.xml`;
const SITE_NAME = 'BestAIAgent.in';

const DIRECTORIES = [
  { name: 'Feedspot', url: 'https://www.feedspot.com/iframe/submit?url=' + encodeURIComponent(FEED_URL) },
  { name: 'Feedage', url: 'http://www.feedage.com/add-feed/?url=' + encodeURIComponent(FEED_URL) },
  { name: 'RSS-Submit', url: 'http://www.rss-submit.com/submit?feed=' + encodeURIComponent(FEED_URL) },
  { name: 'Feeds.com', url: 'https://feeds.com/submit?url=' + encodeURIComponent(FEED_URL) },
  { name: 'Syndic8', url: 'http://www.syndic8.com/register.php?url=' + encodeURIComponent(FEED_URL) },
  { name: 'RSSMicro', url: 'http://www.rssmicro.com/submit?url=' + encodeURIComponent(FEED_URL) },
  { name: 'FeedZilla', url: 'https://feedzilla.com/submit?url=' + encodeURIComponent(FEED_URL) },
];

async function submitToDirectory(dir) {
  try {
    const res = await fetch(dir.url);
    console.log(`${dir.name}: ${res.status} ${res.statusText}`);
    return { name: dir.name, status: res.status };
  } catch (err) {
    console.error(`${dir.name}: failed - ${err.message}`);
    return { name: dir.name, error: err.message };
  }
}

async function submitAll() {
  console.log(`🚀 Submitting RSS feed to directories...\n`);
  const results = await Promise.all(DIRECTORIES.map(submitToDirectory));
  fs.writeFileSync('reports/rss-submission-report.json', JSON.stringify(results, null, 2));
  console.log('\n✅ Submission report saved to reports/rss-submission-report.json');
}

submitAll();