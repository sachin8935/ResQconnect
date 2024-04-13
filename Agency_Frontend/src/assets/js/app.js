// Feather icons are used on some pages
// Replace() replaces [data-feather] elements with icons
import featherIcons from "feather-icons";
featherIcons.replace();

// Mazer internal JS. Include this in your project to get
// the sidebar running.
import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle";
window.bootstrap = bootstrapBundle;

// We could import PerfectScrollbar directly in the sidebar module
import "./../static/js/components/sidebar";
