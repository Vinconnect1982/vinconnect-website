"""VINREADY builder pack. Pricing stays in this file only."""
from reportlab.lib.colors import Color, white, HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

pdfmetrics.registerFont(TTFont("Sans", "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Bold", "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"))

W, H = A4
INK = HexColor("#102033")
TEAL = HexColor("#149C9C")
MUTED = HexColor("#5C6770")
PAPER = HexColor("#F6F4F0")
LINE = HexColor("#D9D4CC")
NAVY = HexColor("#16324A")

COVER = "/workspace/artifacts/imagine_images/af6a835a-d7d0-4406-983d-dc11e6d38d10.jpg"
FRAME = "/workspace/artifacts/imagine_images/5d66141d-1b3b-414d-9cfd-f424b603da36.jpg"
HOME = "/workspace/artifacts/imagine_images/86758865-bc30-459a-84ee-2a7e01270382.jpg"
PROCESS = "/workspace/artifacts/imagine_images/c03fb0ab-7a9a-42e4-a673-5b39fe03e43b.jpg"
PATH = "/workspace/artifacts/imagine_images/e785e70d-43b3-48a3-833a-20c2faed7d4f.jpg"
COMPARE = "/workspace/artifacts/imagine_images/527e6245-49e0-4dcf-a650-12e542a9df59.jpg"
LOGO = "/workspace/artifacts/vinready-src/logo.png"
OUT = "/workspace/public/downloads/vinready-builder-pack.pdf"


def cover_image(c, path, x, y, w, h):
    img = ImageReader(path)
    iw, ih = img.getSize()
    scale = max(w / iw, h / ih)
    nw, nh = iw * scale, ih * scale
    c.saveState()
    p = c.beginPath()
    p.rect(x, y, w, h)
    c.clipPath(p, stroke=0, fill=0)
    c.drawImage(img, x - (nw - w) / 2, y - (nh - h) / 2, nw, nh, mask="auto")
    c.restoreState()


def para(c, text, style, x, y, w, h):
    p = Paragraph(text, style)
    pw, ph = p.wrap(w, h)
    p.drawOn(c, x, y - ph)
    return ph


def footer(c, n):
    c.setFillColor(MUTED)
    c.setFont("Sans", 8)
    c.drawString(36, 22, "VINCONNECT  ·  vinconnect.com.au  ·  0408 559 555")
    c.drawRightString(W - 36, 22, f"{n} / 8")
    c.setStrokeColor(LINE)
    c.setLineWidth(0.4)
    c.line(36, 34, W - 36, 34)


def kicker(c, text, x, y):
    c.setFillColor(TEAL)
    c.setFont("Sans-Bold", 8)
    c.drawString(x, y, text.upper())


def h1(c, text, x, y, size=26):
    c.setFillColor(INK)
    c.setFont("Sans-Bold", size)
    c.drawString(x, y, text)


S = ParagraphStyle("b", fontName="Sans", fontSize=9.5, leading=13, textColor=INK)
SM = ParagraphStyle("m", fontName="Sans", fontSize=9, leading=12, textColor=MUTED)
SB = ParagraphStyle("sb", fontName="Sans-Bold", fontSize=11, leading=14, textColor=INK)


def page_why(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    kicker(c, "Why VinReady", 36, H - 48)
    h1(c, "Why builders add VinReady", 36, H - 74, 22)
    c.setFillColor(MUTED)
    c.setFont("Sans", 10)
    c.drawString(36, H - 94, "Internet stops being a build cost and starts earning.")
    items = [
        ("01", "A new margin line.", "Builder cost $450–$800. You add the margin and set the buyer's price."),
        ("02", "Upgrade or inclusion.", "Sell it as an upgrade, or make it standard on every home."),
        ("03", "Online on move-in day.", "Your buyers can activate Starlink the day they move in."),
        ("04", "No lead-in wait.", "Nobody waits on an NBN lead-in, or for the estate rollout to catch up."),
        ("05", "Scheduled to your build.", "Installs are tied to your build dates, not squeezed in after handover."),
        ("06", "Handover pack included.", "Every buyer gets a VinReady home-buyer handover pack."),
    ]
    for i, (n, title, body) in enumerate(items):
        col, row = i % 2, i // 2
        x = 36 + col * 268
        y = H - 128 - row * 92
        c.setFillColor(TEAL)
        c.setFont("Sans-Bold", 11)
        c.drawString(x, y, n)
        c.setFillColor(INK)
        c.setFont("Sans-Bold", 11)
        c.drawString(x + 28, y, title)
        para(c, body, SM, x + 28, y - 6, 220, 50)
    cover_image(c, FRAME, 36, 48, W - 72, 148)
    c.setFillColor(white)
    c.rect(36, 48, 200, 16, fill=1, stroke=0)
    c.setFillColor(MUTED)
    c.setFont("Sans", 7.5)
    c.drawString(42, 52, "Frame stage. Image: illustrative.")
    footer(c, 2)


def page_margin(c):
    c.setFillColor(white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    kicker(c, "The margin", 36, H - 48)
    h1(c, "Your cost. Your margin.", 36, H - 76, 24)
    para(c, "You set the price your buyers see. These are ranges, not a fixed quote. The home and the option change the cost.", SM, 36, H - 88, 500, 40)
    boxes = [
        ("$450–$800", "Your builder cost"),
        ("$500–$2,000", "The margin you add"),
    ]
    for i, (num, label) in enumerate(boxes):
        x = 36 + i * 268
        c.setFillColor(PAPER)
        c.roundRect(x, H - 230, 250, 90, 6, fill=1, stroke=0)
        c.setFillColor(TEAL)
        c.setFont("Sans-Bold", 22)
        c.drawString(x + 16, H - 184, num)
        c.setFillColor(INK)
        c.setFont("Sans", 10)
        c.drawString(x + 16, H - 206, label)
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 13)
    c.drawString(36, H - 268, "Worked example  ·  illustrative")
    headers = ["", "Lower end", "Upper end"]
    rows = [
        ["Your builder cost", "$450", "$800"],
        ["Your margin", "$500", "$2,000"],
        ["Price to your buyer", "$950", "$2,800"],
    ]
    y = H - 300
    c.setFillColor(NAVY)
    c.rect(36, y - 8, W - 72, 22, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Sans-Bold", 9)
    c.drawString(48, y - 2, "")
    c.drawString(280, y - 2, "Lower end")
    c.drawString(420, y - 2, "Upper end")
    for i, row in enumerate(rows):
        yy = y - 36 - i * 28
        if i == 2:
            c.setFillColor(HexColor("#E7F6F6"))
            c.rect(36, yy - 8, W - 72, 26, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("Sans-Bold" if i == 2 else "Sans", 10)
        c.drawString(48, yy, row[0])
        c.drawString(280, yy, row[1])
        c.drawString(420, yy, row[2])
    para(
        c,
        "Illustrative only: the two ends of the ranges. Your cost depends on the option and the home. Your margin is your call. The Starlink subscription is always between the buyer and Starlink.",
        SM,
        36,
        120,
        500,
        60,
    )
    footer(c, 3)


def page_options(c):
    c.setFillColor(white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    kicker(c, "Two options", 36, H - 48)
    h1(c, "Two ways to offer it", 36, H - 74, 22)
    c.setFillColor(MUTED)
    c.setFont("Sans", 10)
    c.drawString(36, H - 94, "Offer one option or both.")
    cols = [
        ("Option 1", "Starlink Ready", [
            ("We do", "Make the home Starlink ready."),
            ("Starlink order", "Your buyer orders direct from Starlink."),
            ("Getting online", "Your buyer contacts us for final fit-off."),
            ("Move-in day", "Activate on move-in day. No lead-in wait."),
            ("Suits", "Buyers who want to order their own dish, with NBN still open."),
        ]),
        ("Option 2", "Full hardware kit", [
            ("We do", "Supply a full hardware kit, dish included."),
            ("Starlink order", "Hardware is supplied by us."),
            ("Getting online", "Your buyer self-activates."),
            ("Move-in day", "Live when it is powered up. No lead-in wait."),
            ("Suits", "Buyers who want it in place, ready to switch on."),
        ]),
    ]
    for i, (k, title, rows) in enumerate(cols):
        x = 36 + i * 268
        c.setFillColor(NAVY if i == 0 else TEAL)
        c.roundRect(x, H - 250, 252, 130, 6, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("Sans", 8)
        c.drawString(x + 14, H - 146, k.upper())
        c.setFont("Sans-Bold", 14)
        c.drawString(x + 14, H - 168, title)
        yy = H - 280
        for label, body in rows:
            c.setFillColor(INK)
            c.setFont("Sans-Bold", 9)
            c.drawString(x, yy, label)
            ph = para(c, body, SM, x, yy - 2, 240, 36)
            yy -= ph + 16
    c.setFillColor(PAPER)
    c.roundRect(36, 70, W - 72, 48, 6, fill=1, stroke=0)
    para(c, "Both options: builder cost $450–$800. The subscription stays between your buyer and Starlink.", S, 50, 100, 490, 36)
    footer(c, 4)


def page_program(c):
    c.setFillColor(white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    kicker(c, "How it works", 36, H - 46)
    h1(c, "Built into your program", 36, H - 70, 22)
    steps = [
        ("1", "You add it", "Upgrade or inclusion. Tell us the lot and the option."),
        ("2", "We schedule it", "The install is tied to your build dates."),
        ("3", "We do the work", "Done during the build, through your site contact."),
        ("4", "Handover", "Pack included. Option 1 is fit-off. Option 2 is self-activate."),
    ]
    for i, (n, title, body) in enumerate(steps):
        x = 36 + (i % 4) * 136
        c.setFillColor(TEAL)
        c.circle(x + 8, H - 100, 8, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("Sans-Bold", 8)
        c.drawCentredString(x + 8, H - 103, n)
        c.setFillColor(INK)
        c.setFont("Sans-Bold", 9)
        c.drawString(x, H - 124, title)
        para(c, body, SM, x, H - 128, 126, 70)
    stages = [
        ("1  Frame", "Mark the cable path while the frame is still open."),
        ("2  Lock-up", "Mount point and a weatherproof entry. No dish yet."),
        ("3  Near handover", "Rectangular dish on the roof. Router at the point inside."),
    ]
    for i, (title, body) in enumerate(stages):
        x = 36 + i * 178
        c.setFillColor(PAPER)
        c.roundRect(x, 430, 168, 150, 6, fill=1, stroke=0)
        c.setFillColor(NAVY)
        c.rect(x, 546, 168, 34, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("Sans-Bold", 9)
        c.drawString(x + 10, 558, title)
        para(c, body, SM, x + 10, 530, 148, 70)
    cover_image(c, FRAME, 36, 78, 250, 140)
    cover_image(c, HOME, 300, 78, 258, 140)
    c.setFillColor(MUTED)
    c.setFont("Sans", 8)
    c.drawString(36, 60, "Australian frame, then the finished roof with a rectangular dish. Images: illustrative.")
    footer(c, 5)


def page_sales(c):
    c.setFillColor(white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    cover_image(c, HOME, 0, H - 280, W, 280)
    c.setFillColor(Color(0.06, 0.1, 0.14, alpha=0.45))
    c.rect(0, H - 280, W, 280, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Sans-Bold", 8)
    c.drawString(36, H - 48, "THE SALES ANSWER")
    c.setFont("Sans-Bold", 22)
    c.drawString(36, H - 78, "Your go-to Starlink answer")
    para(
        c,
        "“Yes. This home can be VinReady. It is set up for Starlink during the build, so you can activate it on the day you move in, with no waiting for an NBN lead-in.”",
        ParagraphStyle("q", fontName="Sans", fontSize=12, leading=16, textColor=white),
        36,
        H - 100,
        500,
        120,
    )
    c.setFillColor(white)
    c.setFont("Sans", 8)
    c.drawString(36, H - 268, "Finished Australian project home. Image: illustrative.")
    scripts = [
        ("How does it compare with NBN?", "It is another way to get online. Buyers can activate on move-in day, with no lead-in wait. Starlink is price-competitive with NBN plans. It does not replace NBN."),
        ("Which option do I get?", "Option 1: you order Starlink, we do the fit-off. Option 2: the kit is supplied and you activate it."),
        ("What do I get at handover?", "A VinReady home-buyer handover pack. Install or activation questions come to VINCONNECT on 0408 559 555."),
    ]
    y = H - 320
    for title, body in scripts:
        c.setFillColor(INK)
        c.setFont("Sans-Bold", 11)
        c.drawString(36, y, title)
        ph = para(c, body, SM, 36, y - 4, 520, 50)
        y -= ph + 28
    footer(c, 6)


def page_move(c):
    c.setFillColor(white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    kicker(c, "Move-in day", 36, H - 46)
    h1(c, "Keys in. Online today.", 36, H - 72, 22)
    para(c, "Your buyers can activate Starlink the day they move in. With the full kit, they tap Activate Starlink in the app and it is live when the dish is powered up.", SM, 36, H - 84, 520, 40)
    cover_image(c, COMPARE, 28, 360, W - 56, 250)
    c.setFillColor(MUTED)
    c.setFont("Sans", 8)
    c.drawString(36, 344, "Illustrative comparison. Typical outcome, not a promise about a particular estate.")
    notes = [
        "Starlink is an alternative at move-in. NBN can stay available.",
        "No guaranteed speeds. Performance depends on Starlink at that address.",
        "VINCONNECT is an independent installer. Not part of Starlink or NBN.",
    ]
    y = 300
    for note in notes:
        c.setFillColor(TEAL)
        c.circle(44, y + 3, 3, fill=1, stroke=0)
        para(c, note, S, 56, y + 12, 480, 28)
        y -= 28
    footer(c, 7)


def page_close(c):
    c.setFillColor(INK)
    c.rect(0, 520, W, H - 520, fill=1, stroke=0)
    c.drawImage(LOGO, 36, H - 70, width=150, height=28, mask="auto", preserveAspectRatio=True)
    c.setFillColor(TEAL)
    c.setFont("Sans-Bold", 8)
    c.drawString(36, H - 100, "NEXT STEP")
    c.setFillColor(white)
    c.setFont("Sans-Bold", 26)
    c.drawString(36, H - 136, "Add VinReady")
    c.drawString(36, H - 166, "to your homes")
    c.setFont("Sans", 11)
    c.drawString(36, H - 196, "Tell us where you build. We'll show you how it fits.")
    c.setFont("Sans", 10)
    c.drawString(36, H - 230, "vinconnect.com.au/vinready")
    c.drawString(36, H - 248, "Prefer to talk? Call 0408 559 555")
    c.setFillColor(white)
    c.rect(0, 0, W, 520, fill=1, stroke=0)
    cover_image(c, PATH, 28, 250, W - 56, 240)
    c.setFillColor(MUTED)
    c.setFont("Sans", 8)
    c.drawString(36, 232, "Frame-stage pathway. Illustrative. One cable route, marked before the walls close.")
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 11)
    c.drawString(36, 200, "Where we work")
    places = "Cranbourne   ·   Southeast Melbourne   ·   Western Port\nMornington Peninsula   ·   Phillip Island and Bass Coast   ·   Gippsland"
    para(c, places.replace("\n", "<br/>"), S, 36, 196, 520, 40)
    c.setFillColor(MUTED)
    c.setFont("Sans", 8)
    c.drawString(36, 22, "VINCONNECT  ·  Based in Cranbourne  ·  8 / 8")


def page_cover(c):
    cover_image(c, COVER, 0, 0, W, H)
    c.setFillColor(Color(0.04, 0.07, 0.11, alpha=0.78))
    c.rect(0, H - 340, W, 340, fill=1, stroke=0)
    c.setFillColor(Color(0.05, 0.08, 0.12, alpha=0.55))
    c.rect(0, 0, W, 150, fill=1, stroke=0)
    c.drawImage(LOGO, 36, H - 78, width=168, height=32, mask="auto", preserveAspectRatio=True)
    c.setFillColor(TEAL)
    c.setFont("Sans-Bold", 9)
    c.drawString(36, H - 110, "VINREADY   ·   FOR BUILDERS")
    c.setFillColor(white)
    c.setFont("Sans-Bold", 32)
    c.drawString(36, H - 156, "Starlink ready")
    c.drawString(36, H - 194, "from day one")
    c.setFont("Sans", 12)
    c.drawString(36, H - 228, "The builder offer your buyers ask for,")
    c.drawString(36, H - 246, "with margin built in.")
    c.setFont("Sans", 10)
    c.drawString(36, 108, "Cranbourne to Gippsland")
    c.drawString(36, 90, "vinconnect.com.au/vinready")
    c.setFont("Sans", 8)
    c.setFillColor(HexColor("#D5DDE2"))
    c.drawString(36, 48, "New-home street. Image: illustrative. Rectangular Starlink dish.")
    c.drawString(36, 28, "Builder pack  ·  VINCONNECT")


def main():
    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle("VinReady builder pack")
    c.setAuthor("VINCONNECT")
    for draw in (page_cover, page_why, page_margin, page_options, page_program, page_sales, page_move, page_close):
        draw(c)
        c.showPage()
    c.save()
    print(OUT)


if __name__ == "__main__":
    main()
