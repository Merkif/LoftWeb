import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger);

const tab = gsap.utils.toArray('.c-tabs__tab');
const splitDesc = new SplitType('.c-tabs__desc', { types: 'words, chars' });
const tabsDesc = gsap.utils.toArray('.c-tabs__tabpanel:not([hidden]) .c-tabs__desc .char');
const formItems = gsap.utils.toArray('.c-tabs__tabpanel:not([hidden]) :is(.form__item, .form__submit, .form__agreement)');

//tabbed
class Tabbed {
  constructor(tabbedElement, options = {}) {
    if (typeof tabbedElement === 'string') {
      this.tabbed = document.querySelector(tabbedElement);
    } else if (tabbedElement instanceof Element) {
      this.tabbed = tabbedElement;
    }

    if (this.tabbed) {
      this.tablist = this.tabbed.querySelector('ul');
      this.tabs = [...this.tablist.querySelectorAll('a')];
      this.panels = [...this.tabbed.querySelectorAll('[id^="section"]')];
      this.onTabSwitch = options.onTabSwitch || function () { };
      this.init();
    } else {
      console.log('Tabbed element not found.');
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

    newTab.parentElement.classList.add('c-tabs__item--current');
    oldTab.parentElement.classList.remove('c-tabs__item--current');

    const index = Array.from(this.tabs).indexOf(newTab);
    const oldIndex = Array.from(this.tabs).indexOf(oldTab);

    this.panels[oldIndex].hidden = true;
    this.panels[index].hidden = false;

    // this.setCenterTab(newTab);

    this.onTabSwitch(this.panels[index], newTab);
  }
}

const tabs = new Tabbed('#tabs', {
  onTabSwitch(activePanel, activeTab) {
    const tabDesc = [...activePanel.querySelectorAll('.c-tabs__desc .char')];
    const formItems = [...activePanel.querySelectorAll('.form__item, .form__submit, .form__agreement')];

    //update trigger
    ScrollTrigger.refresh();

    //set theme
    setTheme(activeTab)

    //form animation
    formAnim(tabDesc, formItems)
  }
})

//form animation
function formAnim(desc, items) {
  const formTl = gsap.timeline({});

  formTl.fromTo(tab, {
    opacity: 0,
    yPercent: 100
  }, {
    opacity: 1,
    yPercent: 0,
    ease: "expo.out",
    duration: 1.2,
    stagger: .1,
    willChange: "transform"
  }, 0.4);

  formTl.from(desc, {
    y: 100,
    opacity: 0,
    stagger: 0.01,
  }, '<0.3');

  formTl.from(items, {
    yPercent: 100,
    opacity: 0,
    stagger: 0.2,
  }, '<0.35');

  formTl.fromTo(items, {
    "--border-opacity": 1,
    "--border-progress": 0,
  }, {
    "--border-progress": 1,
    "--border-opacity": 0.2,

  }, '<0.3');
}

//set theme
function setTheme(tab) {
  const theme = tab.dataset.theme;

  if (theme) {
    const root = document.documentElement;
    root.classList.forEach(cls => cls.startsWith('theme-') && root.classList.remove(cls));
    root.classList.add(`theme-${theme}`);
  }
}

//start form animation
formAnim(tabsDesc, formItems);
