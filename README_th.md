<p align="center">
  <img src="public/claw-empire.svg" width="80" alt="Claw-Empire" />
</p>

<h1 align="center">Claw-Empire</h1>

<p align="center">
  <strong>บริหารจัดการจักรวาล AI Agent จากโต๊ะ CEO ของคุณ</strong><br>
  <b>CLI</b>, <b>OAuth</b>, <b>API Provider</b> (เช่น <b>Claude Code</b>, <b>Codex CLI</b>, <b>Gemini CLI</b>, <b>OpenCode</b>, <b>GitHub Copilot</b>, <b>Antigravity</b>) ทำงานเป็นบริษัทเสมือนอิสระ Agent AI ตัวเดียว ด้วยสถาปัตยกรรม Local-First
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.2.3-blue" alt="Releases" />
  <a href="https://github.com/GreenSheep01201/claw-empire/actions/workflows/ci.yml"><img src="https://github.com/GreenSheep01201/claw-empire/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI" /></a>
  <img src="https://img.shields.io/badge/node-%3E%3D22-brightgreen" alt="Node.js 22+" />
  <img src="https://img.shields.io/badge/license-Apache%202.0-orange" alt="License" />
  <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey" alt="Platform" />
  <img src="https://img.shields.io/badge/AI-Claude%20%7C%20Codex%20%7C%20Gemini%20%7C%20OpenCode%20%7C%20Copilot%20%7C%20Antigravity-purple" alt="AI Agents" />
</p>

<p align="center">
  <a href="#เริ่มต้นใช้งาน">เริ่มต้นใช้งาน</a> &middot;
  <a href="#ai-installation-guide">คู่มือการติดตั้ง AI</a> &middot;
  <a href="docs/releases/v1.2.3.md">รายละเอียดการอัปเดต</a> &middot;
  <a href="#openclaw-integration">การเชื่อมต่อ OpenClaw</a> &middot;
  <a href="#direct-messenger-without-openclaw">Messenger โดยตรง</a> &middot;
  <a href="#dollar-command-logic">ตรรกะคำสั่ง $</a> &middot;
  <a href="#ฟีเจอร์หลัก">ฟีเจอร์หลัก</a> &middot;
  <a href="#ภาพหน้าจอ">ภาพหน้าจอ</a> &middot;
  <a href="#เทคโนโลยี">เทคโนโลยี</a> &middot;
  <a href="#การตั้งค่า-cli-provider">Provider</a> &middot;
  <a href="#ความปลอดภัย">ความปลอดภัย</a>
</p>

<p align="center">
  <a href="README.md">English</a> | <a href="README_ko.md">한국어</a> | <a href="README_jp.md">日本語</a> | <a href="README_zh.md">中文</a> | <b>ไทย</b>
</p>

<p align="center">
  <img src="Sample_Img/Office.png" alt="Office View" width="100%" />
</p>

---

## Claw-Empire คืออะไร?

Claw-Empire แปลง AI Coding Assistants ที่เชื่อมต่อผ่าน **CLI**, **OAuth**, หรือ **API Key โดยตรง** ให้กลายเป็น **บริษัทซอฟต์แวร์เสมือน** ที่สมบูรณ์ คุณคือ CEO Agent AI คือพนักงานของคุณ ดูAgent ทำงานร่วมกันระหว่างแผนก จัดประชุม ทำงานให้เสร็จ และเลเวลอัพ ผ่านหน้าจอสำนักงานพิกเซลอาร์ตที่น่าสนใจ

### ทำไมต้อง Claw-Empire?

- **หนึ่ง Interface, หลาย AI Agent** — จัดการ Agent ที่ใช้ CLI/OAuth/API จาก Dashboard เดียว
- **Local-First & ความเป็นส่วนตัว** — ข้อมูลทั้งหมดอยู่ใน PC ของคุณ ฐานข้อมูล SQLite ไม่ต้องพึ่ง Cloud
- **สวยงาม & เข้าใจง่าย** — สำนักงานพิกเซลอาร์ตทำให้การประสานงาน AI สนุกและโปร่งใส
- **การทำงานร่วมกันอย่างแท้จริง** — Agent ทำงานใน git worktree แยกกัน เข้าประชุม และสร้างผลลัพธ์

---

## ติดตั้งด้วย AI

> **วางสิ่งต่อไปนี้ลงใน AI Coding Agent (Claude Code, Codex, Gemini CLI ฯลฯ):**
>
> ```
> Install Claw-Empire following the guide at:
> https://github.com/GreenSheep01201/claw-empire
> ```
>
> AI จะอ่าน README นี้และจัดการทุกอย่างโดยอัตโนมัติ

---

## อัปเดตล่าสุด (v1.2.3)

- **ช่องทาง Messenger แบบรวม + Native Adapter** — มาตรฐานช่องทางในตัว (`telegram`, `whatsapp`, `discord`, `googlechat`, `slack`, `signal`, `imessage`) และรวมการประมวลผลการส่งต่อตามช่องทาง
- **ปรับปรุง UX การตั้งค่าห้องแชท** — สร้าง/แก้ไข/ลบด้วย Modal "เพิ่มห้องแชทใหม่" เดียว บันทึกทันทีเมื่อยืนยัน แสดงการจับคู่ Avatar/ชื่อ Agent ต่อห้อง
- **รีเลย์รายงาน/ประชุมแยกช่องทาง** — ตามเส้นทางที่ตั้งไว้ ส่ง `report`, `chat`, `status_update` ไปยังช่องทาง/เป้าหมายต้นทางเท่านั้น
- **Flow ตอบกลับการตัดสินใจ Messenger** — คำขอตัดสินใจถูกส่งไปยังช่องทางที่แมปไว้ ตอบกลับด้วยตัวเลข `1`/`1,3` ถูกประมวลผลทันที
- **ป้องกันการส่งซ้ำ + จัดระเบียบรูปแบบ** — เพิ่มการป้องกันการแจ้งเตือนซ้ำ จัดรูปแบบให้อ่านง่ายบน Messenger
- **ปรับปรุงการอ่านรายงานเสร็จสิ้น** — รายงานเสร็จสิ้นยาวถูกสรุปอัตโนมัติเป็นผลลัพธ์หลัก/สรุปความคืบหน้า ส่งด้านบนด้วยข้อความตัวตนของตัวละคร
- **การผูกโปรเจกต์ + เสริมความปลอดภัย** — บังคับเลือกโปรเจกต์เดิม/ใหม่ก่อนการมอบหมายงาน ใช้ `PROJECT_PATH_ALLOWED_ROOTS` จำกัดการสร้างเส้นทาง
- **เสถียรขึ้นการแชทโดยตรง** — เสริมการทำให้ประโยคซ้ำเป็นมาตรฐานและตรรกะการตีความเซสชัน/เส้นทาง

- เอกสาร: [`docs/releases/v1.2.3.md`](docs/releases/v1.2.3.md)
- เอกสาร API: [`docs/api.md`](docs/api.md), [`docs/openapi.json`](docs/openapi.json)
- นโยบายความปลอดภัย: [`SECURITY.md`](SECURITY.md)

## ภาพหน้าจอ

<table>
<tr>
<td width="50%">

**Dashboard** — KPI แบบเรียลไทม์ อันดับ Agent และสถานะแผนกในมุมมองเดียว

<img src="Sample_Img/Dashboard.png" alt="Dashboard" width="100%" />
</td>
<td width="50%">

**Kanban Board** — จัดการวงจรชีวิตงานแบบครบถ้วนด้วยการลากและวาง มีตัวกรองแผนกและ Agent

<img src="Sample_Img/Kanban.png" alt="Kanban Board" width="100%" />
</td>
</tr>
<tr>
<td width="50%">

**คลัง Skills** — ค้นหาและมอบหมาย Skill ของ Agent มากกว่า 600 รายการ จัดหมวดหมู่

<img src="Sample_Img/Skills.png" alt="Skills Library" width="100%" />
</td>
<td width="50%">

**Multi Provider CLI** — ตั้งค่า Claude Code, Codex, Gemini CLI, OpenCode พร้อมเลือก Model

<img src="Sample_Img/CLI.png" alt="CLI Tools Settings" width="100%" />
</td>
</tr>
<tr>
<td width="50%">

**OAuth Integration** — GitHub & Google OAuth ที่ปลอดภัยพร้อมที่เก็บ Token แบบเข้ารหัส

<img src="Sample_Img/OAuth.png" alt="OAuth Settings" width="100%" />
</td>
<td width="50%">

**รายงานการประชุม** — สรุปการประชุมที่สร้างโดย AI พร้อมการอนุมัติหลายรอบ

<img src="Sample_Img/Meeting_Minutes.png" alt="Meeting Minutes" width="100%" />
</td>
</tr>
<tr>
<td width="50%">

**Messenger Integration** — ตั้งค่า Telegram, WhatsApp, Discord, Google Chat, Slack, Signal, iMessage และส่ง $ CEO Directive

<img src="Sample_Img/telegram.png" alt="Messenger Integration" width="100%" />
</td>
<td width="50%">

**การตั้งค่า** — ตั้งค่าชื่อบริษัท ชื่อ CEO Provider ที่ชอบ (CLI/OAuth/API) และภาษา

<img src="Sample_Img/Setting.png" alt="Settings" width="100%" />
</td>
</tr>
<tr>
<td width="50%">

**รายงานโดยละเอียด** — Popup รายงานหลังขอเสร็จสิ้น ประวัติรายงาน หน้าจอดูรายงานโดยละเอียด

<img src="Sample_Img/Report.png" alt="Detailed Report" width="100%" />
</td>
<td width="50%">

**ตัวอย่างสร้าง PPT** — หน้าจอผลลัพธ์การสร้าง PPT จากการขอรายงาน

<p align="center">
  <img src="Sample_Img/PPT_Gen0.png" alt="PPT Generation Example 0" width="49%" />
  <img src="Sample_Img/PPT_Gen1.png" alt="PPT Generation Example 1" width="49%" />
</p>
</td>
</tr>
</table>

### แหล่งข้อมูล PPT ตัวอย่าง

คุณสามารถใช้แหล่งข้อมูลตัวอย่างด้านล่างเมื่ออ้างอิงหรือขยายฟีเบอร์สร้าง PPT จากรายงาน
เส้นทางการใช้งาน: **แชท > คลิกปุ่มขอรายงาน** แล้วใส่เนื้อหาที่ต้องการ

- โฟลเดอร์: [`docs/reports/Sample_Slides`](docs/reports/Sample_Slides)
- ตัวอย่าง Deck (`.pptx`): [`docs/reports/PPT_Sample.pptx`](docs/reports/PPT_Sample.pptx)
- HTML Slides: [`slide-01.html`](docs/reports/Sample_Slides/slide-01.html), [`slide-02.html`](docs/reports/Sample_Slides/slide-02.html), [`slide-03.html`](docs/reports/Sample_Slides/slide-03.html), [`slide-04.html`](docs/reports/Sample_Slides/slide-04.html), [`slide-05.html`](docs/reports/Sample_Slides/slide-05.html), [`slide-06.html`](docs/reports/Sample_Slides/slide-06.html), [`slide-07.html`](docs/reports/Sample_Slides/slide-07.html), [`slide-08.html`](docs/reports/Sample_Slides/slide-08.html), [`slide-09.html`](docs/reports/Sample_Slides/slide-09.html)
- Build Scripts: [`build-pptx.mjs`](docs/reports/Sample_Slides/build-pptx.mjs), [`build-pptx.cjs`](docs/reports/Sample_Slides/build-pptx.cjs), [`html2pptx.cjs`](docs/reports/Sample_Slides/html2pptx.cjs)

---

## ฟีเพอร์หลัก

| ฟีเจอร์                    | คำอธิบาย                                                                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **สำนักงานพิกเซลอาร์ต**    | มุมมองสำนักงานแบบมีภาพเคลื่อนไหวที่ Agent เคลื่อนที่ ทำงาน และจัดประชุมข้าม 6 แผนก                                                       |
| **Kanban Task Board**      | จัดการวงจรชีวิตงานแบบครบถ้วนด้วยการลากและวาง: Inbox, Planned, Collaborating, In Progress, Review, Done                                   |
| **CEO แชท & Directive**    | สื่อสารโดยตรงกับหัวหน้างาน; `$` Directive รองรับการข้ามประชุมและการกำหนดเส้นทาง/บริบทโปรเจกต์ (`project_path`, `project_context`)        |
| **รองรับ Multi Provider**  | Claude Code, Codex CLI, Gemini CLI, OpenCode, Antigravity — จัดการทั้งหมดจาก Dashboard เดียว                                             |
| **External API Provider**  | เชื่อมต่อ Agent กับ LLM API ภายนอก (OpenAI, Anthropic, Google, Ollama, OpenRouter, Together, Groq, Cerebras, กำหนดเอง) ใน Settings > API |
| **OAuth Integration**      | ใช้ GitHub & Google OAuth พร้อมที่เก็บ Token แบบเข้ารหัส AES ใน SQLite ท้องถิ่น                                                          |
| **WebSocket แบบเรียลไทม์** | อัปเดตสถานะแบบเรียลไทม์ ฟีดกิจกรรม ซิงค์สถานะ Agent                                                                                      |
| **ควบคุม Active Agent**    | ตรวจสอบสถานะ Agent (กระบวนการ/กิจกรรม/ว่าง) ระหว่างทำงาน และหยุดงานที่ค้างบังคับ                                                         |
| **ระบบรายงานงาน**          | Popup เสร็จสิ้น ประวัติรายงาน ดูรายงานตามทีม จัดเก็บสรุปของหัวหน้าฝ่ายวางแผน                                                             |
| **การจัดการพนักงาน**       | จ้าง/แก้ไข/ลบพนักงาน รองรับชื่อหลายภาษา เลือกแผนก/ตำแหน่ง/Provider และตั้งค่าบุคลิกภาพ                                                   |
| **อันดับ Agent & XP**      | Agent ได้ XP จากงานที่เสร็จ; ติดตามผู้ทำได้ดีจากอันดับ                                                                                   |
| **คลัง Skills**            | Skill มากกว่า 600 รายการจัดหมวดหมู่ (Frontend, Backend, Design, AI, DevOps, Security ฯลฯ) รองรับอัปโหลด Skill กำหนดเอง                   |
| **ระบบประชุม**             | การประชุมวางแผนและชั่วคราวพร้อมสรุปการประชุมที่สร้างโดย AI และการอนุมัติหลายรอบ                                                          |
| **Git Worktree แยก**       | แต่ละ Agent ทำงานใน Branch แยกตัว และรวมเข้าเมื่อ CEO อนุมัติเท่านั้น                                                                    |
| **UI หลายภาษา**            | ไทย, เกาหลี, อังกฤษ, ญี่ปุ่น, จีน — ตรวจจับอัตโนมัติหหรือตั้งค่าด้วยตัวเอง                                                               |
| **Messenger Integration**  | Telegram, Discord, Slack ฯลฯ — ส่ง $ CEO Directive และรับอัปเดตงานผ่านช่องทางในตัว (เชื่อมต่อ OpenClaw ได้)                              |
| **ส่งออก PowerPoint**      | สร้างสไลด์ Presentation จากรายงานการประชุมและรายงาน                                                                                      |
| **QA Script การสื่อสาร**   | ตรวจสอบสถานะการสื่อสาร CLI/OAuth/API พร้อม Retry และ Log หลักฐานด้วย `test:comm:*` script                                                |
| **แจ้งเตือนอัปเดตในแอป**   | ตรวจสอบ GitHub Release ล่าสุด แสดง Banner ด้านบนพร้อมแนะนำ `git pull` ตาม OS และลิงก์ Release Notes                                      |
| **การจัดการแผนก**          | วางแผน, พัฒนา, ออกแบบ, QA/QC, DevSecOps, ปฏิบัติการ — แก้ไขลำดับด้วยลูกศร/ลากและวางในแท็บจัดการ dedicated                                |
| **เลือกพนักงานโดยตรง**     | ระบุพนักงานเฉพาะให้โปรเจกต์ ทำให้การประชุมและมอบหมายงานดำเนินการกับพนักงานที่เลือกเท่านั้น                                               |
| **เซฟตี้ Sprite ซ้ำ**      | ป้องกันการเขียนทับไฟล์ Sprite ซ้ำ (`409 sprite_number_exists` response)                                                                  |
| **อัปโหลด Skill กำหนดเอง** | อัปโหลดไฟล์ Skill `.md` จาก UI เพื่อให้ CLI Representative เรียนรู้ Skill กำหนดเอง พร้อม Animation ห้องเรียนกระดานดำและ Interface        |

---

## เทคโนโลยี

| ชั้น                    | เทคโนโลยี                                           |
| ----------------------- | --------------------------------------------------- |
| **Frontend**            | React 19 + Vite 7 + Tailwind CSS 4 + TypeScript 5.9 |
| **Pixel Art Engine**    | PixiJS 8                                            |
| **Backend**             | Express 5 + SQLite (ฐานข้อมูลในตัว ไม่ต้องตั้งค่า)  |
| **การสื่อสารเรียลไทม์** | WebSocket (ws)                                      |
| **Validation**          | Zod 4                                               |
| **ไอคอน**               | Lucide React                                        |
| **Routing**             | React Router 7                                      |
| **ส่งออก**              | PptxGenJS (สร้าง PowerPoint)                        |

<a id="ai-installation-guide">
## คู่มือการติดตั้ง AI

> ส่วนนี้สำหรับ AI Coding Agent ให้รันคำสั่งตรวจสอบในแต่ละขั้นตอนก่อนไปขั้นตอนถัดไป

### ขั้นตอน 0: ตรวจสอบเงื่อนไขเบื้องต้น

```bash
# Node.js 22+
node -v

# pnpm (ถ้ายังไม่มี ให้เปิดใช้ corepack)
pnpm -v || corepack enable

# git
git --version
```

### ขั้นตอน 1: Clone แล้วรัน One-Click Setup

```bash
git clone https://github.com/GreenSheep01201/claw-empire.git
cd claw-empire
git submodule update --init --recursive
bash install.sh
```

Windows PowerShell:

```powershell
git clone https://github.com/GreenSheep01201/claw-empire.git
cd claw-empire
git submodule update --init --recursive
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

### ขั้นตอน 2: ตรวจสอบผลการตั้งค่า

macOS/Linux:

```bash
# ตรวจสอบไฟล์ที่จำเป็น
[ -f .env ] && [ -f scripts/setup.mjs ] && echo "setup files ok"

# ตรวจสอบกฎ Orchestration ของ AGENTS
grep -R "BEGIN claw-empire orchestration rules" ~/.openclaw/workspace/AGENTS.md AGENTS.md 2>/dev/null || true
grep -R "INBOX_SECRET_DISCOVERY_V2" ~/.openclaw/workspace/AGENTS.md AGENTS.md 2>/dev/null || true

# ตรวจสอบรายการ .env ที่จำเป็นสำหรับ OpenClaw inbox
grep -E '^(INBOX_WEBHOOK_SECRET|OPENCLAW_CONFIG)=' .env || true
```

Windows PowerShell:

```powershell
if ((Test-Path .\.env) -and (Test-Path .\scripts\setup.mjs)) { "setup files ok" }
$agentCandidates = @("$env:USERPROFILE\.openclaw\workspace\AGENTS.md", ".\AGENTS.md")
$agentCandidates | ForEach-Object { if (Test-Path $_) { Select-String -Path $_ -Pattern "BEGIN claw-empire orchestration rules" } }
$agentCandidates | ForEach-Object { if (Test-Path $_) { Select-String -Path $_ -Pattern "INBOX_SECRET_DISCOVERY_V2" } }

# ตรวจสอบรายการ .env ที่จำเป็นสำหรับ OpenClaw inbox
Get-Content .\.env | Select-String -Pattern '^(INBOX_WEBHOOK_SECRET|OPENCLAW_CONFIG)='
```

### ขั้นตอน 3: รันและ Health Check

```bash
pnpm dev:local
```

ใน Terminal อื่น:

```bash
curl -s http://127.0.0.1:8790/healthz
```

คำตอบที่คาดหวัง: `{"ok":true,...}`

ช่องทาง Messenger ลงทะเบียนใน UI การตั้งค่า และเก็บใน SQLite (`settings.messengerChannels`) ตัวแปร Messenger Token/Channel บนพื้น `.env` ไม่ได้ใช้แล้ว

### ขั้นตอน 4: ตรวจสอบ Messenger + Inbox (เลือก)

```bash
curl -s http://127.0.0.1:8790/api/messenger/sessions
```

จะส่งคืนรายการเซสชัน Messenger ที่บันทึกไว้

```bash
curl -X POST http://127.0.0.1:8790/api/inbox \
  -H "content-type: application/json" \
  -H "x-inbox-secret: $INBOX_WEBHOOK_SECRET" \
  -d '{"source":"telegram","author":"ceo","text":"$README v1.1.5 inbox ตรวจสอบ","skipPlannedMeeting":true}'
```

คำตอบที่คาดหวัง:

- ถ้าเซิร์ฟเวอร์มี `INBOX_WEBHOOK_SECRET` ตั้งไว้ และ `x-inbox-secret` ตรงกัน -> `200`
- ถ้าขาด/ไม่ตรง Header -> `401`
- ถ้าเซิร์ฟเวอร์ไม่มี `INBOX_WEBHOOK_SECRET` ตั้งไว้ -> `503`

<a id="direct-messenger-without-openclaw"></a>

### ขั้นตอน 5: เชื่อมต่อ Messenger โดยตรงโดยไม่ใช้ OpenClaw

คุณสามารถใช้ Claw-Empire เพียงตัวเดียวเพื่อใช้งานช่องทาง Messenger โดยตรงได้

1. ไปที่ **Settings > ข้อความช่องทาง**
2. กด **เพิ่มห้องแชทใหม่**
3. เลือก Messenger (`telegram`, `whatsapp`, `discord`, `googlechat`, `slack`, `signal`, `imessage`)
4. ใส่ข้อมูลเซสชัน
   - `ชื่อ` (ป้ายกำกับเซสชัน)
   - Token/ข้อมูลรับรอง Messenger
   - `ช่องทาง/ID แชท` (เป้าหมาย)
   - จับคู่ `Agent` ที่จะแชท
5. กด **ยืนยัน** จะบันทึกทันที (ไม่ต้องกดปุ่มบันทึกทั้งหมดแยกต่างหาก)
6. เปิดใช้งานเซสชันแล้วทดสอบ
   - ข้อความทั่วไป -> แชทโดยตรงกับ Agent นั้น
   - `$ ...` -> Flow Directive

หมายเหตุ:

- เซสชัน Messenger เก็บใน SQLite (`settings.messengerChannels`)
- Token Messenger ถูกเข้ารหัสด้วย AES-256-GCM เมื่อเก็บใน SQLite ใช้ `OAUTH_ENCRYPTION_SECRET` (ถ้าไม่มีใช้ `SESSION_SECRET`) ถอดรหัสเฉพาะตอนส่ง/รับ
- ตัวแปร Messenger `.env` (`TELEGRAM_BOT_TOKEN`, `DISCORD_BOT_TOKEN`, `SLACK_BOT_TOKEN` ฯลฯ) ไม่ได้ใช้
- `/api/inbox` + `INBOX_WEBHOOK_SECRET` จำเป็นสำหรับการเชื่อมต่อ Webhook/inbox เท่านั้น (รวมถึง OpenClaw Bridge)

---

## เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

| เครื่องมือ  | เวอร์ชัน | ติดตั้ง                             |
| ----------- | -------- | ----------------------------------- |
| **Node.js** | >= 22    | [nodejs.org](https://nodejs.org/)   |
| **pnpm**    | ล่าสุด   | `corepack enable` (มาพร้อม Node.js) |
| **Git**     | ไม่สำคัญ | [git-scm.com](https://git-scm.com/) |

### One-Click Setup (แนะนำ)

| แพลตฟอร์ม                | คำสั่ง                                                                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **macOS / Linux**        | `git clone https://github.com/GreenSheep01201/claw-empire.git && cd claw-empire && bash install.sh`                                    |
| **Windows (PowerShell)** | `git clone https://github.com/GreenSheep01201/claw-empire.git; cd claw-empire; powershell -ExecutionPolicy Bypass -File .\install.ps1` |

ถ้า Clone ไว้แล้ว:

| แพลตฟอร์ม                | คำสั่ง                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **macOS / Linux**        | `git submodule update --init --recursive && bash scripts/openclaw-setup.sh`                                      |
| **Windows (PowerShell)** | `git submodule update --init --recursive; powershell -ExecutionPolicy Bypass -File .\scripts\openclaw-setup.ps1` |

### ค่าที่จำเป็นของ OpenClaw `.env` (เมื่อใช้ `/api/inbox`)

ตั้งค่าสองค่าด้านล่างใน `.env` ก่อนเชื่อมต่อ Chat Webhook

- `INBOX_WEBHOOK_SECRET=<Secret แบบสุ่มที่ยาวพอ>`
- `OPENCLAW_CONFIG=<เส้นทางสัมบูรณ์ของ openclaw.json>` (แนะนำไม่ใช้เครื่องหมายคำพูด)

`scripts/openclaw-setup.sh` / `scripts/openclaw-setup.ps1` จะสร้าง `INBOX_WEBHOOK_SECRET` โดยอัตโนมัติถ้าว่าง
การติดตั้งเริ่มต้น (`bash install.sh` / `install.ps1`) ก็ผ่าน Setup Script เดียวกัน ดังนั้นจะถูกใช้ตั้งแต่แรก
แม้แค่ `git pull` ในที่เก็บที่ Clone ไว้ ก็จะถูกแก้ไขอัตโนมัติเมื่อรัน `pnpm dev*` / `pnpm start*` ครั้งแรกเมื่อตรงตามเงื่อนไข และ `CLAW_MIGRATION_V1_0_5_DONE=1` จะถูกบันทึกเพื่อป้องกันการรันซ้ำ

`/api/inต้องให้ `INBOX_WEBHOOK_SECRET`ตั้งไว้ที่เซิร์ฟเวอร์และ`x-inbox-secret` Header ตรงกัน

- ขาด/ไม่ตรง Header -> `401`
- เซิร์ฟเวอร์ไม่ได้ตั้งค่า (`INBOX_WEBHOOK_SECRET`) -> `503`

### ตั้งค่าด้วยตัวเอง (ทางเลือก)

<details>
<b>macOS / Linux</b>

```bash
# 1. Clone ที่เก็บ
git clone https://github.com/GreenSheep01201/claw-empire.git
cd claw-empire

# 2. เปิดใช้ pnpm ด้วย corepack
corepack enable

# 3. ติดตั้ง Dependencies
pnpm install

# 4. สร้างไฟล์ .env ท้องถิ่น
cp .env.example .env

# 5. สร้าง Secret เข้ารหัสแบบสุ่ม
node -e "
  const fs = require('fs');
  const crypto = require('crypto');
  const p = '.env';
  const content = fs.readFileSync(p, 'utf8');
  fs.writeFileSync(p, content.replace('__CHANGE_ME__', crypto.randomBytes(32).toString('hex')));
"

# 6. ตั้งค่ากฎ Orchestration ของ AGENTS.md (มอบหมายบทบาท Project Manager ให้ AI Agent)
pnpm setup -- --port 8790

# 7. เริ่มเซิร์ฟเวอร์ Dev
pnpm dev:local
```

</details>

<details>
<b>Windows (PowerShell)</b>

```powershell
# 1. Clone ที่เก็บ
git clone https://github.com/GreenSheep01201/claw-empire.git
cd claw-empire

# 2. เปิดใช้ pnpm ด้วย corepack
corepack enable

# 3. ติดตั้ง Dependencies
pnpm install

# 4. สร้างไฟล์ .env ท้องถิ่น
Copy-Item .env.example .env

# 5. สร้าง Secret เข้ารหัสแบบสุ่ม
node -e "const fs=require('fs');const crypto=require('crypto');const p='.env';const c=fs.readFileSync(p,'utf8');fs.writeFileSync(p,c.replace('__CHANGE_ME__',crypto.randomBytes(32).toString('hex')))"

# 6. ตั้งค่ากฎ Orchestration ของ AGENTS.md (มอบหมายบทบาท Project Manager ให้ AI Agent)
pnpm setup -- --port 8790

# 7. เริ่มเซิร์ฟเวอร์ Dev
pnpm dev:local
```

</details>

### การตั้งค่า AGENTS.md

คำสั่ง `pnpm setup` จะฉีด **CEO Directive Orchestration Rules** ลงในไฟล์ `AGENTS.md` ของ AI Agent ทำให้ AI Coding Agent (Claude Code, Codex ฯลฯ) สามารถ:

- ตีความและมอบหมายงานที่มีลำดับความสำคัญสูง (**CEO Directive**) ที่มีคำนำหน้า `$`
- เรียก Claw-Empire REST API เพื่อสร้างงาน มอบหมาย Agent และรายงานสถานะ
- ทำงานในสภาพแวดล้อม git worktree แยกตัวสำหรับการพัฒนาแบบขนานที่ปลอดภัย

```bash
# พื้นฐาน: ตรวจจับตำแหน่ง AGENTS.md อัตโนมัติ
pnpm setup

# เส้นทางกำหนดเอง
pnpm setup -- --agents-path /path/to/your/AGENTS.md

# พอร์ตกำหนดเอง
pnpm setup -- --port 8790
```

<a id="openclaw-integration"></a>

### การตั้งค่า OpenClaw Integration (Telegram/WhatsApp/Discord/Google Chat/Slack/Signal/iMessage)

`install.sh` / `install.ps1` (หรือ `scripts/openclaw-setup.*`) จะตรวจจับ `OPENCLAW_CONFIG` โดยอัตโนมัติถ้าเป็นไปได้และบันทึกลง `.env`

รูปแบบ `.env` ที่แนะนำ: `OPENCLAW_CONFIG` ควรเป็นเส้นทางสัมบูรณ์ (แนะนำไม่ใช้เครื่องหมายคำพูด)
`v1.0.5` จะทำให้ค่าที่มีเครื่องหมายคำพูด/`~` นำหน้าเป็นมาตรฐานตอน Runtime เพื่อความเข้ากันได้

เส้นทางเริ่มต้น:

| OS                | เส้นทาง                                 |
| ----------------- | --------------------------------------- |
| **macOS / Linux** | `~/.openclaw/openclaw.json`             |
| **Windows**       | `%USERPROFILE%\.openclaw\openclaw.json` |

รันเอง:

```bash
# macOS / Linux
bash scripts/openclaw-setup.sh --openclaw-config ~/.openclaw/openclaw.json
```

```powershell
# Windows PowerShell
powershell -ExecutionPolicy Bypass -File .\scripts\openclaw-setup.ps1 -OpenClawConfig "$env:USERPROFILE\.openclaw\openclaw.json"
```

ตรวจสอบเซสชัน:

```bash
curl -s http://127.0.0.1:8790/api/gateway/targets
```

<a id="dollar-command-logic"></a>

### ตรรกะการมอบหมายงานผ่านแชท OpenClaw ด้วยคำสั่ง `$`

เมื่อข้อความแชทเริ่มต้นด้วย `$` Claw-Empire จะจัดการเป็น CEO Directive

1. Orchestrator จะถามว่าจะจัดประชุมทีมหัวหน้างานหรือไม่ก่อน
2. Orchestrator จะตรวจสอบเส้นทาง/บริบทโปรเจกต์ (`project_path` หรือ `project_context`)
3. ส่งต่อข้อความที่มีคำนำหน้า `$` ไปยัง `POST /api/inbox` พร้อม Header `x-inbox-secret`
4. ถ้าข้ามประชุม จะส่งพร้อม `"skipPlannedMeeting": true`
5. เซิร์ฟเวอร์จะบันทึกเป็น `directive` และแจ้งทั้งบริษัท มอบหมายให้ฝ่ายวางแชท (และแผนกที่กล่าวถึง)

ถ้าไม่มี `x-inbox-secret` หรือไม่ตรงกับ `INBOX_WEBHOOK_SECRET` เซิร์ฟเวอร์จะส่งคืน `401`
ถ้าเซิร์ฟเวอร์ไม่ได้ตั้งค่า `INBOX_WEBHOOK_SECRET` จะส่งคืน `503`

มีประชุม:

```bash
curl -X POST http://127.0.0.1:8790/api/inbox \
  -H "content-type: application/json" \
  -H "x-inbox-secret: $INBOX_WEBHOOK_SECRET" \
  -d '{"source":"telegram","author":"ceo","text":"$เตรียม deploy v0.2 พร้อม QA ภายในศุกร์นี้","project_path":"/workspace/my-project"}'
```

ข้ามประชุม:

```bash
curl -X POST http://127.0.0.1:8790/api/inbox \
  -H "content-type: application/json" \
  -H "x-inbox-secret: $INBOX_WEBHOOK_SECRET" \
  -d '{"source":"telegram","author":"ceo","text":"$Hotfix bug login ทันที","skipPlannedMeeting":true,"project_context":"โปรเจกต์ climpire ที่ทำอยู่"}'
```

เข้าถึงจากเบราว์เซอร์:

| URL                             | คำอธิบาย                   |
| ------------------------------- | -------------------------- |
| `http://127.0.0.1:8800`         | Frontend (Vite Dev Server) |
| `http://127.0.0.1:8790/healthz` | API Health Check           |

---

## ตัวแปร Environment

คัดลอก `.env.example` เป็น `.env` Secret ทั้งหมดเก็บในท้องถิ่น — **ไม่ควร commit `.env`**

| ตัวแปร                                 | จำเป็น                          | คำอธิบาย                                                                                                             |
| -------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `OAUTH_ENCRYPTION_SECRET`              | **จำเป็น**                      | ใช้เข้ารหัส Token OAuth และ Token ช่องทาง Messenger ใน SQLite ด้วย AES-256-GCM                                       |
| `SESSION_SECRET`                       | Fallback                        | กุญแจ Fallback ใช้เมื่อไม่ได้ตั้งค่า `OAUTH_ENCRYPTION_SECRET`                                                       |
| `PORT`                                 | เลือก                           | พอร์ตเซิร์ฟเวอร์ (ค่าเริ่มต้น: `8790`)                                                                               |
| `HOST`                                 | เลือก                           | ที่อยู่ Bind (ค่าเริ่มต้น: `127.0.0.1`)                                                                              |
| `API_AUTH_TOKEN`                       | แนะนำ                           | Bearer Token สำหรับเข้าถึง API/WebSocket จาก Loopback ภายนอก                                                         |
| `INBOX_WEBHOOK_SECRET`                 | **จำเป็นเมื่อใช้ `/api/inbox`** | Secret ที่ต้องตรงกับ Header `x-inbox-secret`                                                                         |
| `OPENCLAW_CONFIG`                      | แนะนำเมื่อใช้ OpenClaw          | เส้นทางสัมบูรณ์ของ `openclaw.json` สำหรับใช้ Gateway Target Lookup/Chat Relay                                        |
| `DB_PATH`                              | เลือก                           | เส้นทางฐานข้อมูล SQLite (ค่าเริ่มต้น: `./claw-empire.sqlite`)                                                        |
| `LOGS_DIR`                             | เลือก                           | ไดเรกทอรี Log (ค่าเริ่มต้น: `./logs`)                                                                                |
| `OAUTH_GITHUB_CLIENT_ID`               | เลือก                           | Client ID ของ GitHub OAuth App                                                                                       |
| `OAUTH_GITHUB_CLIENT_SECRET`           | เลือก                           | Client Secret ของ GitHub OAuth App                                                                                   |
| `OAUTH_GOOGLE_CLIENT_ID`               | เลือก                           | Client ID ของ Google OAuth                                                                                           |
| `OAUTH_GOOGLE_CLIENT_SECRET`           | เลือก                           | Client Secret ของ Google OAuth                                                                                       |
| `OPENAI_API_KEY`                       | เลือก                           | API Key ของ OpenAI (สำหรับ Codex)                                                                                    |
| `REVIEW_MEETING_ONESHOT_TIMEOUT_MS`    | เลือก                           | One-shot Timeout ของการประชุม (มิลลิวินาที) ค่าเริ่มต้น `65000` ค่าต่ำกว่า/เท่ากับ `600` ตีความเป็นวินาที            |
| `UPDATE_CHECK_ENABLED`                 | เลือก                           | เปิดใช้งาน Banner ตรวจสอบอัปเดตในแอป (`1` ค่าเริ่มต้น, `0` ปิด)                                                      |
| `UPDATE_CHECK_REPO`                    | เลือก                           | GitHub Repo Slug สำหรับตรวจสอบอัปเดต (ค่าเริ่มต้น: `GreenSheep01201/claw-empire`)                                    |
| `UPDATE_CHECK_TTL_MS`                  | เลือก                           | Cache TTL ของการตรวจสอบอัปเดต (มิลลิวินาที) (ค่าเริ่มต้น: `1800000`)                                                 |
| `UPDATE_CHECK_TIMEOUT_MS`              | เลือก                           | Timeout ของคำขอ GitHub (มิลลิวินาที) (ค่าเริ่มต้น: `4000`)                                                           |
| `AUTO_UPDATE_ENABLED`                  | เลือก                           | ค่าเริ่มต้นอัปเดตอัตโนมัติเมื่อไม่มี `settings.autoUpdateEnabled` (`0` ค่าเริ่มต้น)                                  |
| `AUTO_UPDATE_CHANNEL`                  | เลือก                           | ช่องทางอัปเดตที่อนุญาต: `patch`(ค่าเริ่มต้น), `minor`, `all`                                                         |
| `AUTO_UPDATE_IDLE_ONLY`                | เลือก                           | ใช้เมื่อไม่มีงาน/CLI Process ที่ทำงานอยู่ (`1` ค่าเริ่มต้น)                                                          |
| `AUTO_UPDATE_CHECK_INTERVAL_MS`        | เลือก                           | ช่วงเวลาตรวจสอบอัปเดตอัตโนมัติ (มิลลิวินาที) (ค่าเริ่มต้น: เหมือน `UPDATE_CHECK_TTL_MS`)                             |
| `AUTO_UPDATE_INITIAL_DELAY_MS`         | เลือก                           | รอก่อนการตรวจสอบอัปเดตอัตโนมัติครั้งแรกหลังเซิร์ฟเวอร์เริ่ม (มิลลิวินาที) (ค่าเริ่มต้น `60000`, ขั้นต่ำ `60000`)     |
| `AUTO_UPDATE_TARGET_BRANCH`            | เลือก                           | ชื่อ Branch ใช้สำหรับ Guard และเป้าหมาย `git fetch/pull` (ค่าเริ่มต้น `main`)                                        |
| `AUTO_UPDATE_GIT_FETCH_TIMEOUT_MS`     | เลือก                           | Timeout ของ `git fetch` ระหว่างใช้อัปเดต (มิลลิวินาที) (ค่าเริ่มต้น `120000`)                                        |
| `AUTO_UPDATE_GIT_PULL_TIMEOUT_MS`      | เลือก                           | Timeout ของ `git pull --ff-only` ระหว่างใช้อัปเดต (มิลลิวินาที) (ค่าเริ่มต้น `180000`)                               |
| `AUTO_UPDATE_INSTALL_TIMEOUT_MS`       | เลือก                           | Timeout ของ `pnpm install --frozen-lockfile` ระหว่างใช้อัปเดต (มิลลิวินาที) (ค่าเริ่มต้น `300000`)                   |
| `AUTO_UPDATE_COMMAND_OUTPUT_MAX_CHARS` | เลือก                           | จำนวนตัวอักษรสูงสุดเก็บใน Memory ตอน Capture stdout/stderr (เกินใช้ tail, ค่าเริ่มต้น `200000`)                      |
| `AUTO_UPDATE_TOTAL_TIMEOUT_MS`         | เลือก                           | ขีดจำกัด Timeout รวมของการใช้อัปเดตครั้งเดียว (มิลลิวินาที) (ค่าเริ่มต้น `900000`)                                   |
| `AUTO_UPDATE_RESTART_MODE`             | เลือก                           | นโยบาย Restart หลังใช้อัปเดตอัตโนมัติ: `notify`(ค่าเริ่มต้น), `exit`, `command`                                      |
| `AUTO_UPDATE_EXIT_DELAY_MS`            | เลือก                           | รอก่อนหยุด Process ในโหมด `exit` (มิลลิวินาที) (ค่าเริ่มต้น `10000`, ขั้นต่ำ `1200`)                                 |
| `AUTO_UPDATE_RESTART_COMMAND`          | เลือก                           | คำสั่งรูปแบบ Executable+Argument ใช้เมื่อนโยบาย Restart เป็น `command` (ปฏิเสธ Shell Meta + เรียก Shell Exec โดยตรง) |

เมื่อเปิดใช้งาน `API_AUTH_TOKEN` Client เบราว์เซอร์ระยะไกลจะใส่ Token ตอน Runtime Token เก็บเฉพาะใน `sessionStorage` ไม่รวมใน Vite Build Output
`OPENCLAW_CONFIG` แนะนำเส้นทางสัมบูรณ์, `v1.0.5` จะทำให้ค่าที่มีเครื่องหมายคำพูด/`~` นำหน้าเป็นมาตรฐานอัตโนมัติ

---

## โหมดการรัน

```bash
# Dev (Local เท่านั้น, แนะนำ)
pnpm dev:local          # Bind ที่ 127.0.0.1

# Dev (เข้าถึงได้จาก Network)
pnpm dev                # Bind ที่ 0.0.0.0

# Production Build
pnpm build              # ตรวจสอบ TypeScript + Vite Build
pnpm start              # รันเซิร์ฟเวอร์ API/Backend (Serve ในโหมด Production)

# Health Check
curl -fsS http://127.0.0.1:8790/healthz
```

### การตรวจสอบ CI (Pipeline PR ปัจจุบัน)

ทุก Pull Request `.github/workflows/ci.yml` จะรันตามลำดับ:

1. Unicode Guard ของ Workflow file
2. `pnpm install --frozen-lockfile`
3. `pnpm run format:check`
4. `pnpm run lint`
5. `pnpm exec playwright install --with-deps`
6. `pnpm run test:ci` (`test:web --coverage` + `test:api --coverage` + `test:e2e`)

แนะนำตรวจสอบก่อน PR:

```bash
pnpm run format:check
pnpm run lint
pnpm run build
pnpm run test:ci
```

### การตรวจสอบ QA การสื่อสาร (v1.1.6)

```bash
# ตรวจสอบแยก
pnpm run test:comm:llm
pnpm run test:comm:oauth
pnpm run test:comm:api

# ตรวจสอบรวม (รวมจุดเข้าดั้งเดิม)
pnpm run test:comm:suite
pnpm run test:comm-status
```

`test:comm:suite` จะสร้างหลักฐานในรูปแบบ Machine-Readable ใน `logs/` และสรุปรายงานใน `docs/`

### QA Smoke เส้นทางโปรเจกต์ (v1.1.6)

```bash
# ต้องใช้ API Auth Token
QA_API_AUTH_TOKEN="<API_AUTH_TOKEN>" pnpm run test:qa:project-path
```

`test:qa:project-path` จะตรวจสอบ API เส้นทางช่วยเหลือ, Flow การสร้างโปรเจกต์, การตอบสนองเมื่อ `project_path` ซ้ำ, และการทำความสะอาด

### Banner อัปเดตในแอป

เมื่อมี Release ล่าสุดบน GitHub Claw-Empire จะแสดง Banner ด้านบนพร้อมแนะนำ Pull และลิงก์ Release Notes

- Windows PowerShell: `git pull; pnpm install`
- macOS/Linux Shell: `git pull && pnpm install`
- Restart เซิร์ฟเวอร์หลัง Pull/Install

### อัปเดตอัตโนมัติ (Safe Mode, Opt-in)

คุณสามารถเปิดใช้งาน Safe Mode อัปเดตอัตโนมัติเพื่อทำให้การซิงค์ Release เป็นอัตโนมัติ

- `GET /api/update-auto-status` — ดูสถานะ Runtime/การตั้งค่าอัปเดตอัตโนมัติ (**ต้องยืนยันตัวตน**)
- `POST /api/update-auto-config` — เปลี่ยน Runtime Toggle อัปเดตอัตโนมัติ (`enabled`) โดยไม่ต้อง Restart เซิร์ฟเวอร์ (**ต้องยืนยันตัวตน**)
- `POST /api/update-apply` — รัน Pipeline อัปเดต On-demand (`dry_run` / `force` / `force_confirm` รองรับ, **ต้องยืนยันตัวตน**)
  - `force=true` จะ Bypass Guard เกือบทั้งหมด ต้องส่ง `force_confirm=true` ด้วย
  - แต่ Guard `dirty_worktree`, `channel_check_unavailable` จะไม่ถูก Bypass และจะถูกบล็อกเสมอ
  - นโยบาย Restart (`notify|exit|command`) ใช้เหมือนกันทั้ง Auto และ Manual
  - โหมด `notify` จะมี `manual_restart_required` ในผลลัพธ์เมื่อสำเร็จ

ค่าเริ่มต้น **ปิด (OFF)** เหมือนเดิม เมื่อเปิดใช้ จะข้ามถ้าเซิร์ฟเวอร์ยุ่งหรือที่เก็บไม่อยู่ในสถานะ Fast-Forward ได้
ถ้า `AUTO_UPDATE_CHANNEL` ผิดจะเตือน Log และ Fallback เป็น `patch` โดยอัตโนมัติ

#### แก้ไขปัญหา: `git_pull_failed` / Branch Diverged

ถ้าผลลัพธ์มี `error: "git_pull_failed"` (หรือ `git_fetch_failed`) พร้อม `manual_recovery_may_be_required` ผู้ดูแลต้องตรวจสอบสถานะที่เก็บ

1. ดู `runtime.last_result`, `runtime.last_error` จาก `GET /api/update-auto-status`
2. ตรวจสอบสถานะ Branch ในที่เก็บเซิร์ฟเวอร์
   - `git fetch origin main`
   - `git status`
   - `git log --oneline --decorate --graph --max-count 20 --all`
3. คืนสถานะเป็น Fast-Forward ได้ตามนโยบายการดำเนินงาน (เช่น Rebase หรือ Reset ตาม `origin/main`)
4. รัน `POST /api/update-apply` อีกครั้ง (ถ้าต้องการตรวจสอบด้วย `{"dry_run": true}`)

Loop อัปเดตอัตโนมัติจะทำงานต่อตามช่วงที่ตั้ง และจะลองอีกครั้งในรอบถัดไปเมื่อที่เก็บกลับมาปลอดภัย

⚠️ `AUTO_UPDATE_RESTART_COMMAND` เป็นฟีเจอร์สิทธิ์สูงที่รันด้วยสิทธิ์เซิร์ฟเวอร์
Parser ปฏิเสธ Shell Meta (`;`, `|`, `&`, `` ` ``, `$`, `<`, `>`) และปฏิเสธการเรียก Shell Exec โดยตรง (`sh`/`bash`/`zsh`/`cmd`/`powershell`/`pwsh`)
ตั้งค่าเป็น Executable + Argument เท่านั้น (ห้ามผสม Input แบบไดนามิก)

---

<a id="cli-provider-การตั้งค่า"></a>

## การตั้งค่า Provider (CLI / OAuth / API)

Claw-Empire รองรับ Provider 3 แบบ:

- **CLI Tool** — รันบน Process หลังติดตั้ง CLI ในเครื่อง
- **OAuth Account** — เชื่อมต่อ Provider ที่รองรับด้วยการแลกเปลี่ยน Token ปลอดภัย
- **Direct API Key** — เชื่อมต่อ Agent กับ LLM API ภายนอกโดยตรงใน **Settings > API**

ติดตั้งอย่างน้อยหนึ่งตัวเพื่อใช้โหมด CLI:

| Provider                                                      | ติดตั้ง                              | การยืนยัน                          |
| ------------------------------------------------------------- | ------------------------------------ | ---------------------------------- |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | `npm i -g @anthropic-ai/claude-code` | `claude` (ทำตามขั้นตอน)            |
| [Codex CLI](https://github.com/openai/codex)                  | `npm i -g @openai/codex`             | ตั้งค่า `OPENAI_API_KEY` ใน `.env` |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli)     | `npm i -g @google/gemini-cli`        | OAuth ในแผงการตั้งค่า              |
| [OpenCode](https://github.com/opencode-ai/opencode)           | `npm i -g opencode`                  | ตั้งค่าตาม Provider                |

ตั้งค่า Provider และ Model ใน **Settings > CLI Tools** ภายในแอป

หรือเชื่อมต่อ Agent กับ LLM API ภายนอกโดยไม่ต้องติดตั้ง CLI ใน **Settings > API** API Key ถูกเข้ารหัส (AES-256-GCM) เก็บในฐานข้อมูล SQLite ท้องถิ่น — ไม่รวมใน `.env` หรือซอร์สโค้ด
การเรียนรู้/ปลด Skill อัตโนมัติทำงานตาม Provider CLI Integration ในปัจจุบัน

---

## โครงสร้างโปรเจกต์

```
claw-empire/
├── .github/
│   └── workflows/
│       └── ci.yml             # PR CI (Unicode Guard, Format, Lint, Test)
├── server/
│   ├── index.ts              # Entry Point Backend
│   ├── server-main.ts        # Runtime Connection/Bootstrap
│   ├── modules/              # Routes/Workflow/Bootstrap Lifecycle
│   ├── test/                 # Backend Test Setup/Helper
│   └── vitest.config.ts      # Backend Unit Test Setup
├── src/
│   ├── app/                  # App Shell, Layout, State Orchestration
│   ├── api/                  # Frontend API Module
│   ├── components/           # UI (Office/Taskboard/Chat/Settings)
│   ├── hooks/                # Polling/WebSocket Hooks
│   ├── test/                 # Frontend Test Setup
│   ├── types/                # Frontend Type Definitions
│   ├── App.tsx
│   ├── api.ts
│   └── i18n.ts
├── tests/
│   └── e2e/                  # Playwright E2E Scenarios
├── public/sprites/           # Pixel Art Agent Sprites
├── scripts/
│   ├── setup.mjs             # Setup สภาพแวดล้อม/Bootstrap
│   ├── auto-apply-v1.0.5.mjs # Migration Helper ตอนเริ่ม
│   ├── openclaw-setup.sh     # One-Click Setup (macOS/Linux)
│   ├── openclaw-setup.ps1    # One-Click Setup (Windows PowerShell)
│   ├── prepare-e2e-runtime.mjs
│   ├── preflight-public.sh   # Security Check ก่อน Release
│   └── generate-architecture-report.mjs
├── install.sh                # Wrapper รัน scripts/openclaw-setup.sh
├── install.ps1               # Wrapper รัน scripts/openclaw-setup.ps1
├── docs/                     # เอกสาร Design และ Architecture
├── AGENTS.md                 # Local Agent/Orchestration Rules
├── CONTRIBUTING.md           # Branch/PR/Review Policy
├── eslint.config.mjs         # Flat ESLint Config
├── .env.example              # Environment Variable Template
└── package.json
```

---

## ความปลอดภัย

Claw-Empire ออกแบบโดยคำนึงถึงความปลอดภัยเป็นอันดับแรก:

- **สถาปัตยกรรม Local-First** — ข้อมูลทั้งหมดเก็บใน SQLite ท้องถิ่น; ไม่ต้องใช้บริการ Cloud ภายนอก
- **OAuth + Messenger Token ที่เข้ารหัส** — Token OAuth ผู้ใช้และ Token ช่องทาง Messenger โดยตรง **เก็บใน SQLite ฝั่งเซิร์ฟเวอร์เท่านั้น**, เข้ารหัสด้วย AES-256-GCM + `OAUTH_ENCRYPTION_SECRET` (`SESSION_SECRET` Fallback) ไม่ส่ง Refresh Token ไปยังเบราว์เซอร์
- **Built-in OAuth Client ID** — GitHub/Google OAuth Client ID/Secret ที่รวมในซอร์สโค้ดเป็น **ข้อมูลประจำตัว OAuth สาธารณะ** ไม่ใช่ Secret ผู้ใช้ ตาม [เอกสาร Google](https://developers.google.com/identity/protocols/oauth2/native-app) Client Secret ของ App ติดตั้ง/Desktop ไม่ถือเป็น "Secret" นี่คือแนวปฏิบัติมาตรฐานของ Open Source App (VS Code, Thunderbird, GitHub CLI ฯลฯ) ข้อมูลประจำตัวนี้ใช้ระบุตัว App เท่านั้น ส่วน Token ส่วนตัวจะถูกเข้ารหัสแยกต่างหากเสมอ
- **ไม่มีข้อมูลประจำตัวส่วนบุคคลในซอร์สโค้ด** — Token ทุกตัวของผู้ใช้ (GitHub, Google OAuth) เก็บเข้ารหัสใน SQLite ท้องถิ่น ไม่รวมในซอร์สโค้ด
- **ไม่มี Secret ในที่เก็บ** — `.gitignore` ครอบคลุมป้องกัน `.env`, `*.pem`, `*.key`, `credentials.json` ฯลฯ
- **ตรวจสอบความปลอดภัย Preflight** — รัน `pnpm run preflight:public` ก่อน Release สาธารณะเพื่อ Scan Secret ที่รั่วไหลใน Worktree และ Git History
- **ค่าเริ่มต้นคือ Localhost** — Dev Server Bind ที่ `127.0.0.1` ไม่แสดงต่อ Network

## สรุปเอกสาร API & นโยบายความปลอดภัย

- **เอกสาร API** — ดูภาพรวม/การใช้ Endpoint ที่ [`docs/api.md`](docs/api.md), สำหรับ Schema/Tool Integration ที่ [`docs/openapi.json`](docs/openapi.json)
- **นโยบายความปลอดภัย** — ดูการรายงาน/นโยบายช่องโหว่ที่ [`SECURITY.md`](SECURITY.md), แนะนำรัน `pnpm run preflight:public` ก่อน Release สาธารณะ

---

## มีส่วนร่วม

ยินดีต้อนรับการมีส่วนร่วม! โปรดทำตามขั้นตอนเหล่านี้:

1. Fork ที่เก็บ
2. สร้าง Feature Branch จาก `dev` (`git checkout -b feature/amazing-feature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add amazing feature'`)
4. รันการตรวจสอบในเครื่องก่อน PR:
   - `pnpm run format:check`
   - `pnpm run lint`
   - `pnpm run build`
   - `pnpm run test:ci`
5. Push ไปยัง Branch (`git push origin feature/amazing-feature`)
6. Pull Request เปิดไปที่ Branch `dev` โดยพื้นฐาน (Branch รวมผู้มีส่วนร่วมภายนอก)
7. `main` ใช้สำหรับ Hotfix ฉุกเฉินที่ผู้ดูแลอนุมัติเท่านั้น แล้วทำ Back-Merge `main -> dev`

นโยบายรายละเอียด: [`CONTRIBUTING.md`](CONTRIBUTING.md)

---

## สัญญาอนุญาต

[Apache 2.0](LICENSE) — ใช้ฟรีทั้งส่วนบุคคลและเชิงพาณิชย์

---

<div align="center">

**สร้างด้วยพิกเซลและความหลงใหล**

_Claw-Empire — ที่ที่ AI Agents มาทำงาน_

</div>
