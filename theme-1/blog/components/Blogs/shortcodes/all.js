import Accordion from "./Accordion";
import Blockquote from "./Blockquote";
import Button from "./Button";
import Code from "./Code";
import Notice from "./Notice";
import Tab from "./Tab";
import Tabs from "./Tabs";
import Video from "./Video";
import Youtube from "./Youtube";
import Link from "./Link";

const shortcodes = {
  button: Button,
  Accordion,
  Video,
  Tab,
  Tabs,
  Notice,
  Code,
  Youtube,
  Blockquote,
  a: Link,
};

export default shortcodes;
