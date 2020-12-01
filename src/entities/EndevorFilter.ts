/*
 * Copyright (c) 2020 Broadcom.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Broadcom, Inc. - initial API and implementation
 */

import * as constants from '../constants';
import { IEndevorFilter, IElement, IRepository } from '../interface/entities';
import { IEndevorQualifier } from '../interface/IEndevorQualifier';

export const FILTER_ALL_STRING = '*/*/*/*/*/*';

export class EndevorFilter implements IEndevorFilter {
  private _envFilter: string;
  private _stageFilter: string;
  private _systemFilter: string;
  private _subsysFilter: string;
  private _typeFilter: string;
  private _elementFilter: string;
  private repository: IRepository;
  private elements: IElement[];

  constructor(repository: IRepository, filterString: string) {
    this.repository = repository;
    this._envFilter = constants.ASTERISK;
    this._stageFilter = constants.ASTERISK;
    this._systemFilter = constants.ASTERISK;
    this._subsysFilter = constants.ASTERISK;
    this._typeFilter = constants.ASTERISK;
    this._elementFilter = constants.ASTERISK;
    this.elements = [];
    this.updateFilterString(filterString);
  }

  public loadElements(newElements: IElement[], append: boolean) {
    if (!append) {
      this.elements = [];
    }
    newElements.forEach((element) => {
      this.elements.push(element);
    });
  }

  public getName(): string {
    if (this.filterAll()) {
      return 'Map';
    }
    return this.getUri();
  }

  public getUri(): string {
    return (
      this._envFilter +
      '/' +
      this._stageFilter +
      '/' +
      this._systemFilter +
      '/' +
      this._subsysFilter +
      '/' +
      this._typeFilter +
      '/' +
      this._elementFilter
    );
  }

  public getDescription(): string {
    return '';
  }

  public getRepository(): IRepository {
    return this.repository;
  }

  public setRepository(value: IRepository) {
    this.repository = value;
  }

  public getElements(): IElement[] {
    return this.elements;
  }

  public setElements(elements: IElement[]) {
    this.elements = elements;
  }

  public getQualifier(): IEndevorQualifier {
    return {
      env: this._envFilter,
      stage: this._stageFilter,
      system: this._systemFilter,
      subsystem: this._subsysFilter,
      type: this._typeFilter,
      element: this._elementFilter,
    };
  }

  private filterAll(): boolean {
    if (this._envFilter !== constants.ASTERISK) {
      return false;
    }
    if (this._stageFilter !== constants.ASTERISK) {
      return false;
    }
    if (this._systemFilter !== constants.ASTERISK) {
      return false;
    }
    if (this._subsysFilter !== constants.ASTERISK) {
      return false;
    }
    if (this._typeFilter !== constants.ASTERISK) {
      return false;
    }
    if (this._elementFilter !== constants.ASTERISK) {
      return false;
    }
    return true;
  }

  public updateFilterString(filterString: string) {
    const filterTokens: string[] = filterString.split('/');
    if (filterTokens.length !== 6) {
      throw new Error('Filter string is invalid!');
    }
    this._envFilter = filterTokens[0];
    this._stageFilter = filterTokens[1];
    this._systemFilter = filterTokens[2];
    this._subsysFilter = filterTokens[3];
    this._typeFilter = filterTokens[4];
    this._elementFilter = filterTokens[5];
  }

  public editFilter(name: string) {
    const filters = this.getRepository().getEndevorFilters();
    if (filters) {
      const index = filters.indexOf(this);
      if (index >= 0) {
        filters[index].updateFilterString(name);
      }
    }
  }

  public deleteFilter() {
    const filters = this.getRepository().getEndevorFilters();
    if (filters) {
      const index = filters.indexOf(this);
      if (index >= 0) {
        filters.splice(index, 1);
      }
    }
  }

  public getEnvFilter(): string {
    return this._envFilter;
  }

  public setEnvFilter(value: string) {
    this._envFilter = value;
  }

  public getStageFilter(): string {
    return this._stageFilter;
  }

  public setStageFilter(value: string) {
    this._stageFilter = value;
  }

  public getSystemFilter(): string {
    return this._systemFilter;
  }

  public setSystemFilter(value: string) {
    this._systemFilter = value;
  }

  public getSubsysFilter(): string {
    return this._subsysFilter;
  }

  public setSubsysFilter(value: string) {
    this._subsysFilter = value;
  }

  public getTypeFilter(): string {
    return this._typeFilter;
  }

  public setTypeFilter(value: string) {
    this._typeFilter = value;
  }

  public getElementFilter(): string {
    return this._elementFilter;
  }

  public setElementFilter(value: string) {
    this._elementFilter = value;
  }
}
