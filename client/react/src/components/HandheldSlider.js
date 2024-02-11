import React from "react";

const HandheldSlider = () => {
    return (
        <div class="HandheldSlider slider">
            <div class="slide-track-1">
                <div class="slide">
                    <a href="/console/Game Boy">
                        <img
                            src="/images/handhelds/gb_icon.png"
                            alt="GameBoy icon"
                            className="handheld-icons"
                            href="/console/Game Boy"
                        />
                    </a>
                </div>
                <div class="slide">
                    <a href="/console/Game Boy Advance">
                        <img
                            src="/images/handhelds/gba_icon.png"
                            alt="GameBoy Advance icon"
                            className="handheld-icons"
                        />
                    </a>
                </div>

                <div class="slide">
                    <a href="/console/Game Boy Color">
                        <img
                            src="/images/handhelds/gbc_icon.png"
                            alt="GameBoy Color icon"
                            className="handheld-icons"
                        />
                    </a>
                </div>
                <div class="slide">
                    <a href="/console/PlayStation Portable">
                        <img
                            src="/images/handhelds/psp_icon.png"
                            alt="Playstation Portable icon"
                            className="handheld-icons"
                        />
                    </a>
                </div>
                <div class="slide">
                    <a href="/console/Nintendo DS">
                        <img
                            src="/images/handhelds/nds_icon.png"
                            alt="Nintendo DS icon"
                            className="handheld-icons"
                        />
                    </a>
                </div>
                <div class="slide">
                    <a href="/console/Virtual Boy">
                        <img
                            src="/images/handhelds/vb_icon.png"
                            alt="Virtual Boy icon"
                            className="handheld-icons"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HandheldSlider;
