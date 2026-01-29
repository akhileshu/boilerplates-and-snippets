package main

import (
	"os"
	"os/exec"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/bubbles/table"
)

type model struct {
	table table.Model
}

func (m model) Init() tea.Cmd { return nil }

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
			_ = cmd.Run()

			return m, nil // stay alive, return to table

		case tea.KeyCtrlD:
			return m, tea.Quit

		case tea.KeyCtrlC, tea.KeyEsc:
			return m, tea.Quit
		}
	}

	var cmd tea.Cmd
	m.table, cmd = m.table.Update(msg)
	return m, cmd
}

func (m model) View() string {
	return m.table.View() + "\n\n↑↓ select • enter run • ctrl+d exit"
}

func main() {
	rows := []table.Row{
		{"Clean node_modules", "rm -rf node_modules"},
		{"Run tests", "go test ./..."},
	}

	t := table.New(
		table.WithColumns([]table.Column{
			{Title: "Action", Width: 20},
			{Title: "Command", Width: 30},
		}),
		table.WithRows(rows),
		table.WithFocused(true),
		table.WithHeight(10),
	)

	p := tea.NewProgram(
		model{table: t},
		tea.WithAltScreen(false), // 👈 IMPORTANT: normal shell behavior
	)

	if err := p.Run(); err != nil {
		panic(err)
	}
}