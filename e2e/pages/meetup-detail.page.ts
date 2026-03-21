import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * 밋업 상세 페이지 (/meetups/[id])
 */
export class MeetupDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(meetupId: string) {
    await this.page.goto(`/meetups/${meetupId}`);
  }

  // --- RSVP ---
  get rsvpButton() {
    return this.page.getByRole("button", { name: /참가 신청|취소하기/ });
  }

  async toggleRsvp() {
    await this.rsvpButton.click();
  }

  get rsvpCount() {
    return this.page.getByTestId("rsvp-count");
  }

  get rsvpProgressBar() {
    return this.page.getByRole("progressbar");
  }

  // --- Breadcrumb ---
  get breadcrumb() {
    return this.page.getByRole("navigation", { name: "breadcrumb" });
  }

  // --- 관련 밋업 ---
  get relatedMeetups() {
    return this.page.getByTestId("related-meetup");
  }
}
