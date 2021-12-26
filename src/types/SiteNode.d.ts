import * as gatsby from "gatsby";

export interface SiteNode extends gatsby.Node {
  host: string;
  siteMetadata: Record<string, unknown>;
}
