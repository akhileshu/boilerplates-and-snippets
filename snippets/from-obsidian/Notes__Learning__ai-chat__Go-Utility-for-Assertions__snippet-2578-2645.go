func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {

	case tea.KeyMsg:
		switch msg.Type {

		case tea.KeyEnter:
			row := m.table.SelectedRow()

			cmd := exec.Command("bash", "-c", row[1])
			cmd.Stdout = os.Stdout
			cmd.Stderr = os.Stderr
			cmd.Stdin = os.Stdin
			cmd.Run()

			return m, nil // stay alive

		case tea.KeyCtrlD:
			return m, tea.Quit

> 🔗 Extracted to GitHub
> https://github.com/akhileshu/boilerplates-and-snippets/blob/main/snippets/from-obsidian/Notes__Learning__ai-chat__Go-Utility-for-Assertions__snippet-2954-3021.txt


## Final takeaway

* Choosing `Ctrl+D` = **good terminal UX instinct**
    