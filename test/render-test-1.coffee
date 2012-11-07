# Copyright (C) 2010 Chris Brody <chris.brody@gmail.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Imports:
HTML = SGWT.UI.HTML
Button = SGWT.UI.Button

HorizontalPanel = SGWT.UI.HorizontalPanel
VerticalPanel = SGWT.UI.VerticalPanel
DockPanel = SGWT.UI.DockPanel
DockDirection = SGWT.UI.DockDirection

class TestButton extends Button
    constructor: (html) ->
        super html

    # Note: this is temporary and will be replaced by a proper listener.
    onBrowserEvent: (evt) ->
        alert('Button clicked')

westPanel = new VerticalPanel
westPanel.add new HTML "<b>West Panel</b>"
westPanel.add new HTML "Test entry"
westPanel.insert (new HTML "<i>inserted entry</i>"), 1

southPanel = new HorizontalPanel
southPanel.add new HTML "<b>South panel</b>"
southPanel.add new HTML "<i>Test entry</i>"
southPanel.insert (new HTML "(<u>inserted entry</u>)"), 1

testPanel = new DockPanel
testPanel.add westPanel, DockDirection.WEST
testPanel.add (new HTML "<b>Test North 1</b>"), DockDirection.NORTH
testPanel.add (new HTML "<b>Test North 2</b>"), DockDirection.NORTH
testPanel.add (new HTML "<b><i>EAST</i> dock</b>"), DockDirection.EAST
testPanel.add (new TestButton "Test Button"), DockDirection.CENTER
testPanel.add southPanel, DockDirection.SOUTH

SGWT.UI.RootPanel().add testPanel

