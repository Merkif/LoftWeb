import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class Tabbed {
  constructor(tabbedElement) {
    if (typeof tabbedElement === 'string') {
      this.tabbed = document.querySelector(tabbedElement);
    } else if (tabbedElement instanceof Element) {
      this.tabbed = tabbedElement;
    }

    if (this.tabbed) {
      this.tablist = this.tabbed.querySelector('ul');
      this.tabs = [...this.tablist.querySelectorAll('a')];
      this.panels = [...this.tabbed.querySelectorAll('[id^="section"]')];
      this.init();
    } else {
      console.error('Tabbed element not found.');
    }
  }

  init() {
    this.tablist.setAttribute('role', 'tablist');

    this.tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('id', `tab${i + 1}`);
      tab.setAttribute('tabindex', '-1');
      tab.parentNode.setAttribute('role', 'presentation');

      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTab = this.tablist.querySelector('[aria-selected]');
        if (e.currentTarget !== currentTab) {
          this.switchTab(currentTab, e.currentTarget);
        }
      });

      tab.addEventListener('keydown', (e) => {
        const index = Array.from(this.tabs).indexOf(e.currentTarget);
        const dir = e.key === 'ArrowLeft' ? index - 1 : e.key === 'ArrowRight' ? index + 1 : e.key === 'ArrowDown' ? 'down' : null;
        if (dir !== null) {
          e.preventDefault();
          dir === 'down' ? this.panels[i].focus() : this.tabs[dir] ? this.switchTab(e.currentTarget, this.tabs[dir]) : undefined;
        }
      });
    });

    this.panels.forEach((panel, i) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      panel.setAttribute('aria-labelledby', this.tabs[i].id);
      panel.hidden = true;
    });

    this.tabs[0].removeAttribute('tabindex');
    this.tabs[0].setAttribute('aria-selected', 'true');
    this.panels[0].hidden = false;
  }

  setActiveTab(tabId) {
    const newTab = this.tablist.querySelector(`#${tabId}`);
    if (newTab) {
      const currentTab = this.tablist.querySelector('[aria-selected]');
      if (newTab !== currentTab) {
        this.switchTab(currentTab, newTab);
      }
    } else {
      console.error(`Tab with id ${tabId} not found.`);
    }
  }

  setTheme(tab) {
    const theme = tab.dataset.theme;

    if (theme) {
      const root = document.documentElement;
      root.classList.forEach(cls => cls.startsWith('theme-') && root.classList.remove(cls));
      root.classList.add(`theme-${theme}`);
    }
  }

  setCenterTab(tab) {
    const tabList = this.tablist;
    let activeTab = tab;
    if (!activeTab) {
      return;
    }
    const tabListRect = tabList.getBoundingClientRect();
    const activeTabRect = activeTab.getBoundingClientRect();
    const tabListLeft = activeTabRect.left - tabListRect.left + (activeTabRect.width - tabListRect.width) / 2;
    tabList.scrollLeft = tabListLeft;
  }

  switchTab(oldTab, newTab) {
    newTab.focus();
    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');

    const index = Array.from(this.tabs).indexOf(newTab);
    const oldIndex = Array.from(this.tabs).indexOf(oldTab);

    this.panels[oldIndex].hidden = true;
    this.panels[index].hidden = false;

    this.setTheme(newTab);
    this.setCenterTab(newTab);
    ScrollTrigger.refresh();
  }
}

const tabs = document.querySelectorAll('.tabs');

tabs.forEach(tab => {
  new Tabbed(tab);
});

