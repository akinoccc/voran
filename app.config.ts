import social from './config/social.json'
import pages from './config/pages.json'
import site from './config/site.json'

export default defineAppConfig({
  ...site,
  social,
  pages,
})
