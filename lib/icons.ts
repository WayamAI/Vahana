// Central icon registry — ICON SOURCE -> ICON REGISTRY -> AppIcon -> components.
// Components must never import a Font Awesome icon directly; they consume a
// semantic name through <AppIcon name="..." /> instead, so the underlying
// glyph is replaceable from this one file.
//
// Style note: Font Awesome Free ships "solid" and "regular" styles, but the
// thin/light outline weight the design reference calls for is Pro-only, and
// Free's "regular" style only covers a narrow set of glyphs (house, bell,
// calendar, file, user, cloud, map, trash-can...) — most of what this
// registry needs (gauge, car, wrench, arrows, chevrons, magnifying glass)
// has no "regular" equivalent in the free tier. Per the brief's own rule
// ("visual consistency is more important" than matching a literal weight),
// this registry standardizes on "solid" throughout rather than mixing
// solid and regular and producing inconsistent icon weight.
import {
  faTableCellsLarge,
  faCarSide,
  faCalendarDays,
  faScrewdriverWrench,
  faFileLines,
  faGear,
  faHouse,
  faMagnifyingGlass,
  faBell,
  faCircleUser,
  faPlus,
  faExpand,
  faCrosshairs,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faLayerGroup,
  faBoxArchive,
  faTrashCan,
  faEllipsisVertical,
  faEnvelope,
  faArrowDownWideShort,
  faLink,
  faDownload,
  faArrowUpRightFromSquare,
  faCircleInfo,
  faGasPump,
  faRoad,
  faGaugeHigh,
  faArrowRight,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faArrowsRotate,
  faCheck,
  faXmark,
  faTriangleExclamation,
  faCircleQuestion,
  faChartSimple,
  faMapLocationDot,
  faPlay,
  faPalette,
  faStar,
  faMinus,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const icons = {
  // Navigation
  dashboard: faTableCellsLarge,
  vehicle: faCarSide,
  calendar: faCalendarDays,
  maintenance: faScrewdriverWrench,
  document: faFileLines,
  settings: faGear,
  home: faHouse,

  // Actions
  search: faMagnifyingGlass,
  add: faPlus,
  edit: faScrewdriverWrench,
  delete: faTrashCan,
  download: faDownload,
  externalLink: faArrowUpRightFromSquare,
  refresh: faArrowsRotate,
  close: faXmark,
  check: faCheck,
  moreVertical: faEllipsisVertical,
  sort: faArrowDownWideShort,
  link: faLink,
  archive: faBoxArchive,

  // Direction
  arrowRight: faArrowRight,
  arrowLeft: faArrowLeft,
  arrowUp: faArrowUp,
  arrowDown: faArrowDown,
  chevronDown: faChevronDown,
  chevronUp: faChevronUp,
  chevronLeft: faChevronLeft,
  chevronRight: faChevronRight,

  // System
  notification: faBell,
  info: faCircleInfo,
  warning: faTriangleExclamation,
  help: faCircleQuestion,
  fullscreen: faExpand,
  target: faCrosshairs,
  layers: faLayerGroup,
  zoomIn: faMagnifyingGlassPlus,
  zoomOut: faMagnifyingGlassMinus,
  user: faCircleUser,
  mail: faEnvelope,

  // Automotive / fleet
  gauge: faGaugeHigh,
  fuel: faGasPump,
  road: faRoad,
  tools: faScrewdriverWrench,
  map: faMapLocationDot,

  // Data
  chart: faChartSimple,

  // Misc
  play: faPlay,
  palette: faPalette,
  sparkle: faStar, // faSparkles isn't in the free tier; faStar is the closest available glyph
  minus: faMinus,
  cloud: faCloud,
} as const satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof icons;
