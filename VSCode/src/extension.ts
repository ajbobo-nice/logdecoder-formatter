import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Extension "ajb-logdecoder-formatter" is now active');

	let disposable = vscode.commands.registerCommand('ajb-logdecoder-formatter.cleanText', cleanText);
	context.subscriptions.push(disposable);
}

export function deactivate() {}

function cleanText() {
	console.log("LogDecoder Formatter: Removing characters");
	const editor = vscode.window.activeTextEditor;
	let count = 0;
	editor?.edit(editBuilder => {
		const fullText = editor?.document.getText();
		const matches = fullText?.matchAll(new RegExp("[\x01-\x08]", "g")); // Find ASCII characters 1 through 8
		for (let match of matches ?? []) {
			count++;
			const pos = match?.index ?? -1;
			const len = (match[0]).length;
			const start = editor?.document.positionAt(pos) ?? new vscode.Position(0,0);
			const end = editor?.document.positionAt(pos + len) ?? new vscode.Position(0,0);
			const range = new vscode.Range(start, end);
			editBuilder.replace(range, " ");
		}
	});
    console.log("LogDecoder Formatter: Done");
	
	vscode.window.showInformationMessage(`${count} replacements made`);
}