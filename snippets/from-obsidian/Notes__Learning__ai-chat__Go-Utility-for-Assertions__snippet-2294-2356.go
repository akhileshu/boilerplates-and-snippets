t := table.New(
	table.WithColumns([]table.Column{
		{Title: "Action", Width: 20},
		{Title: "Command", Width: 40},
	}),
	table.WithRows(rows),
	table.WithFocused(true),
	table.WithHeight(10), // 👈 THIS FIXES IT
)