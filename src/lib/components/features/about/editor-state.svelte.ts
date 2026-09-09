import { aboutFile } from '$lib/data/about';
import { educationFile } from '$lib/data/education';
import type { EditorFile, EditorFileId } from '$lib/types';

export const editorFiles: Record<EditorFileId, EditorFile> = {
  about: aboutFile,
  education: educationFile
};

export const editorFileOrder = ['about', 'education'] as const satisfies readonly EditorFileId[];

class EditorState {
  activeFile = $state<EditorFileId>('about');
  tabs = $state<EditorFileId[]>(['about']);
  cursorLine = $state(1);

  open(id: EditorFileId): void {
    this.activeFile = id;
    if (!this.tabs.includes(id)) {
      this.tabs.push(id);
    }
    this.cursorLine = 1;
  }

  closeTab(id: EditorFileId): void {
    const index = this.tabs.indexOf(id);
    if (index === -1 || this.tabs.length === 1) {
      return;
    }
    this.tabs.splice(index, 1);
    if (this.activeFile === id) {
      this.activeFile = this.tabs[Math.min(index, this.tabs.length - 1)];
      this.cursorLine = 1;
    }
  }
}

export const editor = new EditorState();
