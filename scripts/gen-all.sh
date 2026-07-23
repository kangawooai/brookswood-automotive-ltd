#!/bin/bash
# Generate all site images. Runs in small parallel batches.
cd "$(dirname "$0")/.."
G="node scripts/gen-image.js"
L="1536x1024"

run() { $G "$1" "$2" "$3"; }

# Batch 1 - heroes (no people, no text)
run "Interior of a modern professional car repair garage workshop, a car raised on a hydraulic two-post lift, tools organised on wall panels, clean concrete floor, bright industrial lighting, no people, no text, professional photography" "$L" "home-hero.png" &
run "MOT testing bay in a UK garage, a car positioned over an inspection pit with brake testing rollers and headlamp beam tester equipment, industrial lighting, no people, no text, photorealistic" "$L" "mot-hero.png" &
run "Exterior of a professional independent car garage building with roller shutter doors and forecourt, UK street setting, overcast daylight, no people, no text, photorealistic" "$L" "about-hero.png" &
wait
# Batch 2 - hero + service closeups
run "Car servicing counter and workshop reception area with a clean forecourt visible through glass, UK garage, warm lighting, no people, no text, photorealistic" "$L" "contact-hero.png" &
run "Rows of new car tyres stacked neatly and a tyre fitting machine in a garage workshop, industrial setting, no people, no text, photorealistic" "$L" "services-hero.png" &
run "Close-up of a mechanic's hands-free engine bay of a modern car during a full service, oil filter and dipstick visible, clean workshop, no people, no text, photorealistic" "$L" "servicing.png" &
wait
# Batch 3
run "Close-up of a car brake disc and red brake caliper with the wheel removed, workshop background, detailed automotive photography, no people, no text" "$L" "brakes.png" &
run "Close-up of a car suspension coil spring and strut assembly on a workbench, garage workshop background, no people, no text, photorealistic" "$L" "suspension.png" &
run "Underside view of a car exhaust system and catalytic converter on a lift in a garage, industrial lighting, no people, no text, photorealistic" "$L" "exhausts.png" &
wait
# Batch 4
run "Car clutch plate and flywheel assembly components laid out on a clean workbench in a garage, detailed automotive photography, no people, no text" "$L" "clutches.png" &
run "Automotive diagnostic scanner tool plugged into a car dashboard OBD port with fault code readout on screen showing generic symbols, no readable text, workshop, no people, photorealistic" "$L" "diagnostics.png" &
run "Wheel alignment machine with sensors clamped to a car wheel in a garage bay, laser alignment rig, no people, no text, photorealistic" "$L" "wheel-alignment.png" &
wait
# Batch 5
run "Refurbished silver alloy wheel on a workbench with refinishing equipment in a garage, close-up detailed photography, no people, no text" "$L" "alloy-repair.png" &
run "Car body panel repair in a bodyshop, a door panel being prepared for painting with masking, spray booth background, no people, no text, photorealistic" "$L" "body-repair.png" &
run "Organised mechanic tool wall and workbench with spanners, sockets and diagnostic equipment in a tidy garage, industrial lighting, no people, no text, photorealistic" "$L" "workshop-tools.png" &
wait
# Batch 6 - homepage secondary
run "A silver car on a hydraulic lift being inspected from underneath in a bright garage workshop, UK-style number plate blank, no people, no text, photorealistic" "$L" "why-choose.png" &
run "Close-up of tyre tread depth being checked with a gauge on a car tyre, garage floor, detailed photography, no people, no text" "$L" "tyres-content.png" &
wait
echo "ALL IMAGES DONE"
